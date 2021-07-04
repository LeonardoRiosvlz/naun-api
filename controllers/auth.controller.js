const config = require("../config/config");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const db = require("../models");
const { user } = require("../models");
const { text } = require("body-parser");
const User = db.user;
const Cliente = db.cliente;
const Op = db.Op;

exports.signup =async (req, res) => {

 await User.create({
    email: req.body.email,
    tipo:"Master",
    status: "activo",
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
        // User role 1
    res.send({ 
      message: "User was registered successfully!",
      user:user
     });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

 

// Update a Book by the id in the request
exports.update = (req, res) => {
  const id = req.body.id;
  const body={};
  if(req.files['filename']){
    const { filename } = req.files['filename'][0]
    body.imagen= `http://localhost:5000/public/${filename}`
  }
  if(req.files['firma']){
    const { filename } = req.files['firma'][0]
    body.firma= `http://localhost:5000/public/${filename}`;
  }
  body.nombre= req.body.nombre;
  body.apellido= req.body.apellido;
  body.sexo= req.body.sexo;
  body.entidad= req.body.entidad;
  body.cargo= req.body.cargo;
  body.codigo= req.body.codigo;
  body.telefono= req.body.telefono;
  body.tipo= req.body.tipo;
  body.regional= req.body.regional;
  body.direccion= req.body.direccion;
  body.status= req.body.status;
  body.dependencia= req.body.dependencia;
  if(req.body.tipo_tecnico){
    body.tipo_tecnico= req.body.tipo_tecnico;
  }
  if(req.body.tipo_cuenta){
    body.tipo_cuenta= req.body.tipo_cuenta;
  }
  if(req.body.nombre_cuenta){
    body.nombre_cuenta= req.body.nombre_cuenta;
  }
  if(req.body.cuenta){
    body.cuenta= req.body.cuenta;
  }
  User.update(body,{
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe USer was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

exports.signin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({
    where: {
      email: email
    },
    include: [  
      {
        model:Cliente,
        attributes:['id']
      },
    ],
  }).then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      let passwordIsValid = bcrypt.compareSync(
        password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      let token = jwt.sign({ id: user.id,rol: user.tipo, email: user.email,nombre: user.nombre,cliente: user.clientes}, config.auth.secret, {
        expiresIn: '365d' // 24 hours
      });
      res.status(200).send({
        id: user.id,
        rol: user.tipo,
        email: user.email,
        accessToken: token
      });
      User.update({
        token:token
      },{
        where: { email: req.body.email }
      })
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.resetPass = (req, res) => {
  const email = req.body.email;
  User.findOne({
    where: {
      email: email
    }
  }).then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      let token = jwt.sign({ id: user.id,rol: user.tipo, email: user.email,nombre: user.nombre,apellido: user.apellido}, config.auth.secret, {
        expiresIn: 4000 // 24 hours
      });

      const transporter = nodemailer.createTransport({

        host: 'mail.tuhotelenecuador.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'empresa@tuhotelenecuador.com',
            pass: 'empresa2021'
        }

    });

    const mailOptions={
      from:"empresa@tuhotelenecuador.com",
      to:"leonardorios2718@gmail.com",
      subject:"Recuperacion de contraseña",
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
       <head> 
        <meta charset="UTF-8"> 
        <meta content="width=device-width, initial-scale=1" name="viewport"> 
        <meta name="x-apple-disable-message-reformatting"> 
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta content="telephone=no" name="format-detection"> 
        <title>New email</title> 
        <!--[if (mso 16)]>
          <style type="text/css">
          a {text-decoration: none;}
          </style>
          <![endif]--> 
        <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> 
        <!--[if gte mso 9]>
      <xml>
          <o:OfficeDocumentSettings>
          <o:AllowPNG></o:AllowPNG>
          <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
      </xml>
      <![endif]--> 
        <style type="text/css">
      .rollover div {
        font-size:0;
      }
      .rollover:hover .rollover-first {
        max-height:0px!important;
        display:none!important;
      }
      .rollover:hover .rollover-second {
        max-height:none!important;
        display:inline-block!important;
      }
      #outlook a {
        padding:0;
      }
      .ExternalClass {
        width:100%;
      }
      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
        line-height:100%;
      }
      .es-button {
        mso-style-priority:100!important;
        text-decoration:none!important;
      }
      a[x-apple-data-detectors] {
        color:inherit!important;
        text-decoration:none!important;
        font-size:inherit!important;
        font-family:inherit!important;
        font-weight:inherit!important;
        line-height:inherit!important;
      }
      .es-desk-hidden {
        display:none;
        float:left;
        overflow:hidden;
        width:0;
        max-height:0;
        line-height:0;
        mso-hide:all;
      }
      [data-ogsb] .es-button {
        border-width:0!important;
        padding:5px 30px 5px 30px!important;
      }
      @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1 { font-size:30px!important; text-align:center; line-height:120%!important } h2 { font-size:26px!important; text-align:center; line-height:120%!important } h3 { font-size:20px!important; text-align:center; line-height:120%!important } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:13px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } a.es-button, button.es-button { font-size:16px!important; display:block!important; border-left-width:0px!important; border-right-width:0px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }
      </style> 
       </head> 
       <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
        <div class="es-wrapper-color" style="background-color:#F6F6F6"> 
         <!--[if gte mso 9]>
            <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
              <v:fill type="tile" color="#f6f6f6"></v:fill>
            </v:background>
          <![endif]--> 
         <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top"> 
           <tr style="border-collapse:collapse"> 
            <td valign="top" style="padding:0;Margin:0"> 
             <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
               <tr style="border-collapse:collapse"> 
                <td class="es-adaptive" align="center" style="padding:0;Margin:0"> 
                 <table class="es-content-body" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
                   <tr style="border-collapse:collapse"> 
                    <td align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px"> 
                     <!--[if mso]><table style="width:560px"><tr><td style="width:268px" valign="top"><![endif]--> 
                     <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                       <tr style="border-collapse:collapse"> 
                        <td align="left" style="padding:0;Margin:0;width:268px"> 
                         <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                           <tr style="border-collapse:collapse"> 
                            <td class="es-infoblock es-m-txt-c" align="left" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px">Put your preheader text here</p></td> 
                           </tr> 
                         </table></td> 
                       </tr> 
                     </table> 
                     <!--[if mso]></td><td style="width:20px"></td><td style="width:272px" valign="top"><![endif]--> 
                     <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
                       <tr style="border-collapse:collapse"> 
                        <td align="left" style="padding:0;Margin:0;width:272px"> 
                         <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                           <tr style="border-collapse:collapse"> 
                            <td class="es-infoblock es-m-txt-c" align="right" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px"><a href="http://#" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px">View in browser</a></p></td> 
                           </tr> 
                         </table></td> 
                       </tr> 
                     </table> 
                     <!--[if mso]></td></tr></table><![endif]--></td> 
                   </tr> 
                 </table></td> 
               </tr> 
             </table> 
             <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
               <tr style="border-collapse:collapse"></tr> 
               <tr style="border-collapse:collapse"> 
                <td class="es-adaptive" align="center" style="padding:0;Margin:0"> 
                 <table class="es-header-body" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px"> 
                   <tr style="border-collapse:collapse"> 
                    <td style="Margin:0;padding-top:15px;padding-bottom:20px;padding-left:20px;padding-right:20px;background-color:#ffffff" bgcolor="#ffffff" align="left"> 
                     <!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:174px" valign="top"><![endif]--> 
                     <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                       <tr style="border-collapse:collapse"> 
                        <td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:174px"> 
                         <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                           <tr style="border-collapse:collapse"> 
                            <td class="es-m-txt-c" align="left" style="padding:0;Margin:0;font-size:0px"><a href="https://data:image/jpeg;base64,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" target="_blank" class="rollover" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#333333;font-size:14px"><img src="https://hobhfv.stripocdn.email/content/guids/CABINET_451f41c32f08be25c332db18baa3d28f/images/16761625406735258.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="118" class="rollover-first"> 
                              <div style="font-size:0;mso-hide:all"> 
                               <img width="118" class="rollover-second" style="display:none;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;max-height:0px" src="https://hobhfv.stripocdn.email/content/guids/CABINET_451f41c32f08be25c332db18baa3d28f/images/41441599781680292.png" alt> 
                              </div></a></td> 
                           </tr> 
                         </table></td> 
                       </tr> 
                     </table> 
                     <!--[if mso]></td><td style="width:20px"></td><td style="width:366px" valign="top"><![endif]--> 
                     <table cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                       <tr style="border-collapse:collapse"> 
                        <td align="left" style="padding:0;Margin:0;width:366px"> 
                         <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;border-left:2px solid #808080;border-right:2px solid #808080;border-top:2px solid #808080;border-bottom:2px solid #808080" width="100%" cellspacing="0" cellpadding="0"> 
                           <tr style="border-collapse:collapse"> 
                            <td align="center" style="padding:0;Margin:0;display:none"></td> 
                           </tr> 
                         </table></td> 
                       </tr> 
                     </table> 
                     <!--[if mso]></td></tr></table><![endif]--></td> 
                   </tr> 
                 </table></td> 
               </tr> 
             </table> 
             <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
               <tr style="border-collapse:collapse"> 
                <td align="center" style="padding:0;Margin:0"> 
                 <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
                   <tr style="border-collapse:collapse"> 
                    <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-top:30px"> 
                     <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                       <tr style="border-collapse:collapse"> 
                        <td valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
                         <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                           <tr style="border-collapse:collapse"> 
                            <td align="left" style="padding:0;Margin:0;padding-bottom:5px"><h2 style="Margin:0;line-height:29px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:24px;font-style:normal;font-weight:normal;color:#333333">Recuperacion de contraseña</h2></td> 
                           </tr> 
                           <tr style="border-collapse:collapse"> 
                            <td class="es-m-txt-c" align="left" style="padding:0;Margin:0;padding-bottom:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">El siguiente enlase te llevara a la recuperacion de contraseña este link tiene un timpo de expiracion corto&nbsp;<br></p></td> 
                           </tr> 
                         </table></td> 
                       </tr> 
                     </table></td> 
                   </tr> 
                 </table></td> 
               </tr> 
             </table> 
             <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
               <tr style="border-collapse:collapse"> 
                <td align="center" style="padding:0;Margin:0"> 
                 <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
                   <tr style="border-collapse:collapse"> 
                    <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px"> 
                     <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                       <tr style="border-collapse:collapse"> 
                        <td valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
                         <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                           <tr style="border-collapse:collapse"> 
                            <td align="left" style="padding:0;Margin:0;padding-bottom:10px"><span class="es-button-border" style="border-style:solid;border-color:#808080;background:#3D85C6;border-width:2px;display:inline-block;border-radius:0px;width:auto"><a href="http://localhost:8080/#/resetpass/${token}" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none !important;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#333333;font-size:16px;border-style:solid;border-color:#3D85C6;border-width:5px 30px 5px 30px;display:inline-block;background:#3D85C6;border-radius:0px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:19px;width:auto;text-align:center"> Button </a></span></td> 
                           </tr> 
                         </table></td> 
                       </tr> 
                     </table></td> 
                   </tr> 
                 </table></td> 
               </tr> 
             </table> 
             <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
               <tr style="border-collapse:collapse"> 
                <td align="center" style="padding:0;Margin:0"> 
                 <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#ffffff;width:600px" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"> 
                   <tr style="border-collapse:collapse"> 
                    <td align="left" style="padding:0;Margin:0"> 
                     <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                       <tr style="border-collapse:collapse"> 
                        <td valign="top" align="center" style="padding:0;Margin:0;width:600px"> 
                         <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                           <tr style="border-collapse:collapse"> 
                            <td align="center" style="padding:0;Margin:0;padding-bottom:40px;padding-left:40px;padding-right:40px;font-size:0"> 
                             <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                               <tr style="border-collapse:collapse"> 
                                <td style="padding:0;Margin:0;border-bottom:0px solid #efefef;background:#FFFFFF none repeat scroll 0% 0%;height:1px;width:100%;margin:0px"></td> 
                               </tr> 
                             </table></td> 
                           </tr> 
                         </table></td> 
                       </tr> 
                     </table></td> 
                   </tr> 
                   <tr style="border-collapse:collapse"> 
                    <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px"> 
                     <!--[if mso]><table style="width:560px" cellpadding="0" 
                              cellspacing="0"><tr><td style="width:270px" valign="top"><![endif]--> 
                     <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                       <tr style="border-collapse:collapse"> 
                        <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:270px"> 
                         <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                           <tr style="border-collapse:collapse"> 
                            <td class="es-m-txt-c" align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></td> 
                           </tr> 
                         </table></td> 
                       </tr> 
                     </table> 
                     <!--[if mso]></td><td style="width:20px"></td><td style="width:270px" valign="top"><![endif]--> 
                     <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
                       <tr style="border-collapse:collapse"> 
                        <td align="left" style="padding:0;Margin:0;width:270px"> 
                         <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                           <tr style="border-collapse:collapse"> 
                            <td class="es-m-txt-c" align="right" style="padding:0;Margin:0;padding-top:5px;font-size:0"> 
                             <table class="es-table-not-adapt es-social" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                               <tr style="border-collapse:collapse"> 
                                <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px"><img title="Facebook" src="https://hobhfv.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                                <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px"><img title="Twitter" src="https://hobhfv.stripocdn.email/content/assets/img/social-icons/logo-black/twitter-logo-black.png" alt="Tw" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                                <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px"><img title="Instagram" src="https://hobhfv.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                                <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px"><img title="Youtube" src="https://hobhfv.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                               </tr> 
                             </table></td> 
                           </tr> 
                         </table></td> 
                       </tr> 
                     </table> 
                     <!--[if mso]></td></tr></table><![endif]--></td> 
                   </tr> 
                 </table></td> 
               </tr> 
             </table> 
             <table class="es-footer" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"> 
               <tr style="border-collapse:collapse"> 
                <td align="center" style="padding:0;Margin:0"> 
                 <table class="es-footer-body" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#808080;width:600px"> 
                   <tr style="border-collapse:collapse"> 
                    <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px"> 
                     <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                       <tr style="border-collapse:collapse"> 
                        <td valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
                         <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                           <tr style="border-collapse:collapse"> 
                            <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#FFFFFF;font-size:14px">Company Address</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#FFFFFF;font-size:14px">Pellentesque vitae interdum ligula. Pellentesque feugiat ligula ligula,</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#FFFFFF;font-size:14px">in interdum dolor aliquet et. Aliquam vitae sem eget erat viverra malesuada. Aliquam volutpat vel est quis euismod. Faucibus varius ex eget aliquam.</p></td> 
                           </tr> 
                         </table></td> 
                       </tr> 
                     </table></td> 
                   </tr> 
                 </table></td> 
               </tr> 
             </table></td> 
           </tr> 
         </table> 
        </div>  
       </body>
      </html>`




    }

    transporter.sendMail(mailOptions, (error, info)=>{
      if(error){
        res.status(500).send(error.message);

      }else{
        console.log("email enviado ") 
        res.status(200).send({
          message: "Email enviado!!."
        });
      }
    })
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// Update a Book by the id in the request
exports.recoverPass = (req, res) => {
  const id = req.userId;
  User.update({
    password: bcrypt.hashSync(req.body.password, 8)
  },{
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Contraseña editada!!."
        });
      } else {
        res.send({
          message: `No se pudo editar la contraseña!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};