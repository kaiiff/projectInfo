// const fs = require("fs");
// const path = require("path");
// const handlebar = require("handlebars");
// const nodemailer = require("nodemailer");

// const AVAILABLETEMPLATES = {
//   CONTACT_INFORMATION: "contact-information"
// };

// class Email {
//   constructor(template = "") {
//     this.body = "";
//     this.subject = "";
//     this.cc = [];
//     if (template) {
//       this.setTemplate(template);
//     }
//   }

//   setTemplate(template) {
//     if (!Object.values(AVAILABLETEMPLATES).includes(template)) {
//       throw new Error("Invalid template");
//     }

//     this.template = template;
//     switch (template) {
//       case AVAILABLETEMPLATES.CONTACT_INFORMATION:
//         this.subject = "Registerd Successfully ";
//         break;

//       default:
//         break;
//     }
//   }
//   setBody(data) {
//     if (!this.template) {
//       throw new Error("Template not set");
//     }
//     const fileBody = fs
//       .readFileSync(
//         path.join(__dirname, "..", `views/templates/${this.template}.hbs`)
//       )
//       .toString();


//     const template = handlebar.compile(fileBody);

//     this.body = template(data);
//   }

//   setRawBody(body) {
//     this.body = body;
//   }

//   setSubject(subject) {
//     this.subject = subject;
//   }

//   setCC(email) {
//     this.cc = email;
//   }

//   async send(email) {
//     if (!email) {
//       throw new Error("Email not set");
//     }
//     if (!this.body || !this.subject) {
//       throw new Error("Body or subject not set");
//     }

//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 465,
//       secure: true,
//       auth: {
//         user: process.env.EMAIL_USERNAME, 
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });

//     const info = await transporter.sendMail({
//       from: `"Infosense.ai" <${process.env.EMAIL_USERNAME}>`,
//       to: email,
//       subject: "Contact Information",
//       html: this.body,
//     });

//     return info;
//   }

//   static sendEmail(template, data, email, cc = []) {
//     const emailClient = new Email(template);
//     emailClient.setBody(data);
//     emailClient.setCC(cc);
//     return emailClient.send(email);
//   }
// }
// module.exports = {
//   Email,
//   AVAILABLETEMPLATES
// }