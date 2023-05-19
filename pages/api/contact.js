// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { mailOptions, transporter } from "../../config/nodemailer";

const handler = async (req, res) => {
  let data;
  if (req.method === "POST") {
    data = req.body;
    console.log('data: ', data);
    if (!data || !data.name || !data.email || !data.subject || !data.message) {
      return res.status(400).json({ message: 'Bad request' });
    }
  }

  try {
    await transporter.sendMail({
      ...mailOptions,
      subject: data.subject,
      text: "This is a test of the text property",
      html: "<h1>This is an h1 test Title</h1><p>This is a paragraph text test</p>",
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });

  }

  return res.status(400).json({ message: 'Bad request' });
}

export default handler;



// const handler = async (req, res) => {
//   if (req.method === "POST") {
//     const data = req.body;
//     if (!data || !data.name || !data.email || !data.subject || !data.message) {
//       return res.status(400).send({ message: "Bad request" });
//     }

//     try {
//       await transporter.sendMail({
//         ...mailOptions,
//         ...generateEmailContent(data),
//         subject: data.subject,
//       });

//       return res.status(200).json({ success: true });
//     } catch (err) {
//       console.log(err);
//       return res.status(400).json({ message: err.message });
//     }
//   }
//   return res.status(400).json({ message: "Bad request" });
// };
// export default handler;