import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {

      // $('#wizard').steps();
      $('#form').steps({
        bodyTag: 'fieldset',
        onStepChanging: function (event, currentIndex, newIndex) {
          // Always allow going backward even if the current step contains invalid fields!
          if (currentIndex > newIndex) {
            return true;
          }

          // Forbid suppressing "Warning" step if the user is to young
          if (newIndex === 3 && Number($('#age').val()) < 18) {
            return false;
          }

          // tslint:disable-next-line:prefer-const
          let form = $(this);

          // Clean up if user went backward before
          if (currentIndex < newIndex) {
            // To remove error styles
            $('.body:eq(' + newIndex + ') label.error', form).remove();
            $('.body:eq(' + newIndex + ') .error', form).removeClass('error');
          }

          // Disable validation on fields that are disabled or hidden.
          form.validate().settings.ignore = ':disabled,:hidden';

          // Start validation; Prevent going forward if false
          return form.valid();
        },
        onStepChanged: function (event, currentIndex, priorIndex) {
          // Suppress (skip) "Warning" step if the user is old enough.
          if (currentIndex === 2 && Number($('#age').val()) >= 18) {
            $(this).steps('next');
          }

          // Suppress (skip) "Warning" step if the user is old enough and wants to the previous step.
          if (currentIndex === 2 && priorIndex === 3) {
            $(this).steps('previous');
          }
        },
        onFinishing: function (event, currentIndex) {
          const form = $(this);

          // Disable validation on fields that are disabled.
          // At this point it's recommended to do an overall check (mean ignoring only disabled fields)
          form.validate().settings.ignore = ':disabled';

          // Start validation; Prevent form submission if false
          return form.valid();
        },
        onFinished: function (event, currentIndex) {
          const form = $(this);

          // Submit form input
          form.submit();
        }
      }).validate({
        errorPlacement: function (error, element) {
          element.before(error);
        },
        rules: {
          confirm: {
            equalTo: '#password'
          }
        }
      });

    $('.chosen-select').chosen({width: "100%"});
  }

}
