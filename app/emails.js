var nodemailer = require('nodemailer');

module.exports = function(req, next) {

	// // create reusable transporter object using SMTP transport
	// var transporter = nodemailer.createTransport({
	//     service: 'Gmail',
	//     auth: {
	//         user: 'sloantests@gmail.com',
	//         pass: 'sloantests1'
	//     }
	// });

	// // setup e-mail data with unicode symbols
	// var mailOptions = {
	//     from: 'Sloan Tests<sloantests@gmail.com>', // sender address
	//     to: 'ohiodesigner@gmail.com', // list of receivers
	//     subject: 'Hello', // Subject line
	//     text: 'Hello world', // plaintext body
	//     html: '<b>Hello world</b>' // html body
	// };

	// transporter.sendEmail(function() {
	// 	// send mail with defined transport object
	// 	transporter.sendMail(mailOptions, function(error, info){
	// 	    if(error){
	// 	        console.log(error);
	// 	    }else{
	// 	        console.log('Message sent: ' + info.response);
	// 	    }
	// 	});
	// });
	// next();
};