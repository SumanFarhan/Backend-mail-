const Email=require('../Model/email')

exports.saveSentEmails=async(req, res)=>{
try{
    const email = await new Email(req.body);
    email.save();

    res.status(200).json('email saved successfully');
}catch(error){
    res.status(500).json({ message: err.message })
}
}


exports.getEmails = async (request, response) => {
    try {
        let emails;

        if (request.params.type === 'starred') {
            emails = await Email.find({ starred: true, bin: false });
        } else if (request.params.type === 'bin') {
            emails = await Email.find({ bin: true })
        } else if (request.params.type === 'allmail') {
            emails = await Email.find({});
        } else if (request.params.type === 'inbox') {
            emails = [];
        } else {
            emails = await Email.find({ type: request.params.type });
        }

        response.status(200).json(emails);
    } catch (error) {
        response.status(500).json(error.message);
    }
}


exports.moveEmailsToBin=async(req,res)=>{
    try{
        await Email.updateMany({ _id: { $in: req.body }}, { $set: { bin: true, starred: false, type: '' }})

        return res.status(200).json('email deleted successfully');

    }catch(error){
        res.status(500).json(error.message)
    }

}

exports.toggleStarredEmails=async(req,res)=>{
    try {   
        await Email.updateOne({ _id: req.body.id }, { $set: { starred: req.body.value }})
        res.status(201).json('Email is starred mark ');
    } catch (error) {
        res.status(500).json(error.message);
    }
}

exports.deleteEmails=async(req,res)=>{
    try {
        await Email.deleteMany({ _id: { $in: req.body }})
        res.status(200).json('emails deleted successfully');
    } catch (error) {
        res.status(500).json(error.message);
    }
}