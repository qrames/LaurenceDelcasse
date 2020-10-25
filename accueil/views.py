from django.shortcuts import render
from django.http import HttpResponseRedirect

from django.core.mail import send_mail

from .forms import ContactForm

# Create your views here.
import logging
logger = logging.getLogger(__name__)

def index(request):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = ContactForm(request.POST)
        # check whether it's valid:

        if form.is_valid():
            subject = form.cleaned_data['subject']
            message = form.cleaned_data['message']
            sender = form.cleaned_data['sender']
            cc_myself = form.cleaned_data['cc_myself']

            recipients = ['quentinrames@gmail.com']
            if cc_myself:
                recipients.append(sender)

            send_mail(subject, message, sender, recipients)
            logger.error((subject, message, sender, recipients))
            return HttpResponseRedirect('/thanks/')
    # if a GET (or any other method) we'll create a blank form
    else:
        form = ContactForm()
    return render(request, 'accueil/index.html', {'form': form})


def thanks(request):
    context = {}
    return render(request, 'accueil/thanks.html', context)
