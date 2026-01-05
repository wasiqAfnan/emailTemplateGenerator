export const generateEmail = async (req, res) => {
    const { purpose, recipient_name, tone } = req.body;
    console.log(purpose, recipient_name, tone);
    res.send("Email generated successfully");
};