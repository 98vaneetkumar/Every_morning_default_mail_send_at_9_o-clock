const Service = require("../service");
const cron = require("node-cron");
const nodemailer = require("nodemailer");


const sendMailToAllUser=async(emails)=>{
  console.log("This is sendMailToall user")
  var transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
  });
  //Send Email
  let info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: emails,
    subject: "This is cron test API",
    html: `<h3>
    THIS IS CRON TEST API
  </h3>`,
  });

}

module.exports = {
  Add: async (data) => {
    let userdata = {
      name: data.name,
      email: data.email,
      age: data.age,
      gender: data.gender,
      address: data.address,
    };
    let user = await Service.userService.addUser(userdata);
    if (user) {
      return {
        status: "Success",
        message: "Add user successfull",
        user: user,
      };
    } else {
      return {
        status: "unSuccess",
        message: " unable to Add user ",
        user: user,
      };
    }
  },
  get: async (data) => {
    const user = await Service.userService.getuser();
    // console.log("Just user", user);
    let emails = [];
    user.map((key) => {
      emails.push(key.email);
    });
    console.log("Emails are", emails);

    if (user) {
      return {
        status: "Success",
        user: user,
      };
    }
  },
  sendMail: async (data, req, res) => {
    cron.schedule("* * 9", async function () {
      console.log("running a task every day at 9 o'clock ");

      const user = await Service.userService.getuser();
      if (user) {
        let emails = [];
        user.map((key) => {
          emails.push(key.email);
        });
        console.log("Emails are", emails);
        sendMailToAllUser(emails)
      }
    });
  },
};
