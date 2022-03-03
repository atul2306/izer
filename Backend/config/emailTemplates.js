const client_origin = process.env.CLIENT_ORIGIN;

module.exports = {
    //confirm-email-template
    confirmEmailTemp: (id, name) => ({
        subject: "Confirm Email",
        html: `
          <h2>Hello, ${name}</h2>
          <p><br>Please Confirm Your Email
             <br>Please <a href="${client_origin}/confirm/${id}"> CLICK HERE</a>
             <br>Please click on the following link, or paste this into your browser to complete the process:
             <br>${client_origin}/confirm/${id}
             <br>
            
          </p>`,
      }),
}