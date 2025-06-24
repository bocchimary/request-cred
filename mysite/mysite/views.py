from django.shortcuts import render

#LANDING PAGE
def landing(request):
    return render(request,'home.html')
#OTP PAGE
def otp(request):
     return render(request,'otp.html')
  
#trial page
def trial(request):
     return render(request,'trial.html')
#student dashboard
def students(request):
     return render(request,'students.html')
#main login/signup page
def login(request):
     return render(request,'login.html')