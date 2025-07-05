from django.db import models
import uuid

# --------------------
# USER MODEL
# --------------------
class User(models.Model):
    USER_TYPES = [
        ('student', 'Student'),
        ('alumni', 'Alumni'),
        ('signatory', 'Signatory'),
        ('admin', 'Admin'),
        ('business_manager', 'Business Manager'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)
    full_name = models.CharField(max_length=255)
    email = models.EmailField(blank=True, null=True)
    contact_number = models.CharField(max_length=20, blank=True, null=True)
    user_type = models.CharField(max_length=20, choices=USER_TYPES)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} ({self.username})"

    class Meta:
        db_table = 'user'


# --------------------
# STUDENT PROFILE
# --------------------
class StudentProfile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    student_number = models.CharField(max_length=50, unique=True)
    program = models.CharField(max_length=100)
    year_level = models.IntegerField()
    is_graduating = models.BooleanField(default=False)

    def __str__(self):
        return self.student_number

    class Meta:
        db_table = 'student_profile'


# --------------------
# DOCUMENT REQUEST
# --------------------
class DocumentRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('ready', 'Ready'),
        ('released', 'Released'),
        ('blocked_due_to_balance', 'Blocked Due to Balance'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    requester = models.ForeignKey(User, on_delete=models.CASCADE)
    document_type = models.CharField(max_length=100)
    preferred_release = models.DateField()
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.document_type} ({self.status})"

    class Meta:
        db_table = 'document_request'


# --------------------
# ENROLLMENT / GRADUATION FORMS
# --------------------
class Form(models.Model):
    FORM_TYPE_CHOICES = [
        ('enrollment', 'Enrollment'),
        ('graduation', 'Graduation'),
    ]
    STATUS_CHOICES = [
        ('submitted', 'Submitted'),
        ('under_review', 'Under Review'),
        ('approved', 'Approved'),
        ('blocked_due_to_balance', 'Blocked Due to Balance'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='student_forms')
    form_type = models.CharField(max_length=20, choices=FORM_TYPE_CHOICES)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='submitted')
    submitted_at = models.DateTimeField(auto_now_add=True)
    approved_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='approved_forms')

    def __str__(self):
        return f"{self.form_type} ({self.status})"

    class Meta:
        db_table = 'form'


# --------------------
# FINANCIAL CLEARANCE
# --------------------
class FinancialClearance(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    has_balance = models.BooleanField(default=False)
    checked_at = models.DateTimeField(auto_now_add=True)
    remarks = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} - Balance: {'Yes' if self.has_balance else 'No'}"

    class Meta:
        db_table = 'financial_clearance'

