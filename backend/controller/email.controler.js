import transporter from "../config/NodeMailer.js";

export const sendEmail = async (req, res) => {
  console.log(req.body);
  const { name, email, message, phone, eventType, preferredContact } = req.body;

  try {
    const mailOptions = {
      from: email,
      to: "rashmikanethsarani119@gmail.com",
      subject: `New Contact Form Submission from ${name}`,
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br/>${message}</p>
             <p><strong>Phone Number:</strong> ${phone}</p>
             <p><strong>Event Type:</strong> ${eventType}</p>
             <p><strong>Contact Method:</strong> ${preferredContact}</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
};
