const nodemailer = require("nodemailer");
// const transporter = nodemailer.createTransport({
// 	host: process.env.HOST,
// 	service: process.env.SERVICE,
// 	port: Number(process.env.EMAIL_PORT),
// 	secure: Boolean(process.env.SECURE),
// 	auth: {
// 		user: process.env.USER,
// 		pass: process.env.PASS,
// 	},
// });
// transporter.sendMail({
// 	from: process.env.USER,
// 	to: 'ali.afify93746@gmail.com',
// 	subject: "subject", 
// 	text: "text",
// }).then((result=>console.log(result)) )
// .catch((e)=>console.log('error mail',e))

//  verify connection configuration
// transporter.verify(function (error, success) {
// 	if (error) {
// 	  console.log('verify error',error);
// 	} else {
// 	  console.log("Server is ready to take our messages");
// 	}
//   });
module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.HOST,
			service: process.env.SERVICE,
			port: Number(process.env.EMAIL_PORT),
			secure: Boolean(process.env.SECURE),
			auth: {
				user: process.env.USER,
				pass: process.env.PASS,
			},
		});

		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: subject,
			text: text,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log('email error',error);
		return error;
	}
};
//  verify connection configuration
// transporter.verify(function (error, success) {
// 	if (error) {
// 	  console.log(error.message);
// 	} else {
// 	  console.log("Server is ready to take our messages");
// 	}
//   });