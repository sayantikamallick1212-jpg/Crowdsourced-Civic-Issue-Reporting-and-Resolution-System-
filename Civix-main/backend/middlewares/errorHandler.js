module.exports=(err, req, res, next)=>{
    console.error(err.stack);
    if (err.name === "MulterError") {
        const message = err.code === "LIMIT_FILE_SIZE" ? "Image must be 10 MB or smaller." : "Upload a JPEG, PNG, or WebP image.";
        return res.status(400).json({ error: message });
    }
    res.status(500).json({error: 'Internal Server Error'});
};
