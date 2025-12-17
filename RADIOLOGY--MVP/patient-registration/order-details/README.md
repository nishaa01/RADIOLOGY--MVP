# Patient Registration vs Order – Notes

## What is Patient Registration?
Patient Registration is the process of capturing and maintaining a patient's
demographic and administrative information in the hospital system.
It creates a unique identity for the patient using identifiers like UHID or MRN.

Registration focuses on *who the patient is*, not on the medical services provided.

## What is an Order?
An Order is a medical request placed by a physician for a specific diagnostic
test or procedure such as X-Ray, CT, MRI, or lab investigations.

Orders focus on *what medical service is required* for the patient.

## Why Are They Separate in Hospitals?
- One patient can have multiple orders over time.
- Patient data is relatively static, while orders are dynamic.
- Separation ensures clean data management and avoids duplication.
- Hospital standards like HL7 follow this modular structure.
- Billing, tracking, and auditing become simpler and more accurate.

## Summary
Patient Registration defines the patient's identity in the system.
Orders define the medical actions to be performed.
Both are separated to maintain scalability, accuracy, and standard compliance
in hospital information systems.
