import moment from 'moment';

const useHtmlTemplate = ({
	type,
	email,
	booking,
	baseUrl,
	name,
	phone,
	description
}) => {
	switch (type) {
		case 'CLIENT_CONFIRM_BOOKING':
			return [
				`Thank you for booking!`,
				`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" />
      <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head> </head>
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="x-apple-disable-message-reformatting" />
          <!--[if !mso]><!-->
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <!--<![endif]-->
          <style type="text/css">
            * {
              text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
              -moz-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
            }
      
            html {
              height: 100%;
              width: 100%;
            }
      
            body {
              height: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              width: 100% !important;
              mso-line-height-rule: exactly;
            }
      
            div[style*="margin: 16px 0"] {
              margin: 0 !important;
            }
      
            table,
            td {
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
            }
      
            img {
              border: 0;
              height: auto;
              line-height: 100%;
              outline: none;
              text-decoration: none;
              -ms-interpolation-mode: bicubic;
            }
      
            .ReadMsgBody,
            .ExternalClass {
              width: 100%;
            }
      
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass td,
            .ExternalClass div {
              line-height: 100%;
            }
          </style>
          <!--[if gte mso 9]>
            <style type="text/css">
            li { text-indent: -1em; }
            table td { border-collapse: collapse; }
            </style>
            <![endif]-->
          <title> </title>
          <!-- content -->
          <!--[if gte mso 9]><xml>
             <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
             </o:OfficeDocumentSettings>
            </xml><![endif]-->
        </head>
        <body class="body" style="background-color: #000000; margin: 0; width: 100%;">
          <table class="bodyTable" role="presentation" width="100%" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; background-color: #000000; margin: 0;" bgcolor="#000000">
            <tr>
              <td class="body__content" align="left" width="100%" valign="top" style="color: #000000; font-size: 16px; line-height: 20px; font-family: Helvetica,Arial,sans-serif;">
                <div class="header" style="background-color: #000000; height: 100px; width: 100%; color: #000000; font-family: Helvetica,Arial,sans-serif;">
                  <div class="container" style="margin: 0 auto; max-width: 600px; width: 100%;"> <!--[if mso | IE]>
                    <table class="container__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-right: auto; margin-left: auto;width: 600px" width="600" align="center">
                      <tr>
                        <td> <![endif]-->
                          <table class="container__table" role="presentation" border="0" align="center" cellpadding="0" cellspacing="0" width="100%">
                            <tr class="container__row">
                              <td class="container__cell" width="100%" align="left" valign="top">
                                <div class="row">
                                  <table class="row__table" width="100%" align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
                                    <tr class="row__row"> <a class="logo-link a" large="12" href="${baseUrl}" style="width: min-content; color: #000000; text-decoration: none;"><span class="a__text" style="color: #000000; text-decoration: none;">
                <img class="logo img__block" src="${baseUrl}/images/apex-apps-logo.png" alt="
Apex Apps" border="0" style="display: block; max-width: 100%; white-space: pre; text-align: center; margin: 0 auto; font-size: 30px; color: #309772;"/>
                </span></a> </tr>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </table> <!--[if mso | IE]> </td>
                      </tr>
                    </table> <![endif]--> </div>
                </div>
                <div class="container" style="margin: 0 auto; max-width: 600px; width: 100%;"> <!--[if mso | IE]>
                  <table class="container__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-right: auto; margin-left: auto;width: 600px" width="600" align="center">
                    <tr>
                      <td> <![endif]-->
                        <table class="container__table" role="presentation" border="0" align="center" cellpadding="0" cellspacing="0" width="100%">
                          <tr class="container__row">
                            <td class="container__cell" width="100%" align="left" valign="top">
                              <div class="content row" style="border-left: 1px solid #CF3A19; margin: 10px 10px 30px; padding: 20px; background-color: #090909;">
                                <table class="row__table" width="100%" align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
                                  <tr class="row__row">
                                    <td class="column col-sm-12" width="600" style="width: 100%" align="left" valign="top">
                                      <h1 class="title header h1" style="margin: 20px 0; line-height: 40px; width: 100%; font-family: Helvetica,Arial,sans-serif; padding-left: 10px; background-color: transparent; margin-bottom: 20px; margin-top: 0; height: min-content; color: #BDBDBD; font-weight: 500;">Hi ${name},</h1>
                                      <p class="content-text text p" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0 15px; color: #BDBDBD; font-size: 18px; margin: 0 0 5px;"> Thank you for booking a call to discuss your web application. </p>
                                      <p class="content-text text p" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0 15px; color: #BDBDBD; font-size: 18px; margin: 0 0 5px;"><br/>
                                      I will give you a call on ${phone} at ${moment
					.unix(booking.timestamp)
					.minute(0)
					.format('h:mma dddd Do MMMM YYYY')} </p>
                                      <p class="content-text text p" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0 15px; color: #BDBDBD; font-size: 18px; margin: 0 0 5px;">
                                      <br/> Feel free to reply to this email to get in touch with me. </p>
                                      <p class="content-text text p" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0 15px; color: #BDBDBD; font-size: 18px; margin: 0 0 5px;">
                                      Click this link if you need to <a class="cancel-link a" href="${baseUrl}/cancel/${
					booking._id
				}/client" style="color: #AB3351; text-decoration: none;"><span class="a__text" style="color: #AB3351; text-decoration: none;">Cancel your booking</span></a> </p>
                                      <p
                                        class="content-text text p" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0 15px; color: #BDBDBD; font-size: 18px; margin: 0 0 5px;"> <br/> I look forward to speaking with you! </p>
                                        <p class="content-text signature1 text p" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0 15px; color: #BDBDBD; font-size: 18px; margin: 0 0 5px; margin-left: 20px;"><br/> Kind Regards,</p>
                                        <p class="content-text signature2 text p" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0 15px; color: #BDBDBD; font-size: 18px; margin: 0 0 5px; font-style: italic; margin-left: 40px;">Aaron Gazzola</p>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                            </td>
                          </tr>
                        </table> <!--[if mso | IE]> </td>
                    </tr>
                  </table> <![endif]--> </div>
                <div class="footer" style="background-color: #090909; height: min-content; width: 100%;">
                  <div class="container" style="margin: 0 auto; max-width: 600px; width: 100%;"> <!--[if mso | IE]>
                    <table class="container__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-right: auto; margin-left: auto;width: 600px" width="600" align="center">
                      <tr>
                        <td> <![endif]-->
                          <table class="container__table" role="presentation" border="0" align="center" cellpadding="0" cellspacing="0" width="100%">
                            <tr class="container__row">
                              <td class="container__cell" width="100%" align="left" valign="top">
                                <div class="footer-row row" style="padding: 10px 25px;">
                                  <table class="row__table" width="100%" align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
                                    <tr class="row__row">
                                      <p class="footer-text text p" large="2" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; color: #616161; font-size: 14px; padding: 0; margin: 0;">This email was sent by Apex Apps, ABN: 81700757157.</p>
                                      <p class="footer-text text p" large="2" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; color: #616161; font-size: 14px; padding: 0; margin: 0;">Make sure you add aaron@apexapps.dev to your address book and safe list.</p>
                                      <p class="footer-text text p" large="2" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; color: #616161; font-size: 14px; padding: 0; margin: 0;">You have recieved this email because your email address was used to confirm a booking at ApexApps.dev. This is not a promotional email.</p>
                                      <p class="footer-text footer-center text p" large="2" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; color: #616161; font-size: 14px; padding: 0; margin: 0; text-align: center;"><br/> &copy; Copyright ${moment().year()} Apex Apps</p>
                                      <p class="footer-text footer-center text p" large="4" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; color: #616161; font-size: 14px; padding: 0; margin: 0; text-align: center;">Designed and developed by <a class="link a" href="${baseUrl}" style="color: #309772; text-decoration: none;"><span class="a__text" style="color: #309772; text-decoration: none;">Apex Apps</span></a></p>
                                    </tr>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </table> <!--[if mso | IE]> </td>
                      </tr>
                    </table> <![endif]--> </div>
                </div>
              </td>
            </tr>
          </table>
          <div style="display:none; white-space:nowrap; font-size:15px; line-height:0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>
        </body>
      </html>
      `
			];
		case 'ADMIN_CONFIRM_BOOKING':
			return [
				`New call booking at ${moment
					.unix(booking.timestamp)
					.minute(0)
					.format('h:mma dddd Do')}`,
				`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" />
      <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head> </head>
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="x-apple-disable-message-reformatting" />
          <!--[if !mso]><!-->
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <!--<![endif]-->
          <style type="text/css">
            * {
              text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
              -moz-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
            }
      
            html {
              height: 100%;
              width: 100%;
            }
      
            body {
              height: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              width: 100% !important;
              mso-line-height-rule: exactly;
            }
      
            div[style*="margin: 16px 0"] {
              margin: 0 !important;
            }
      
            table,
            td {
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
            }
      
            img {
              border: 0;
              height: auto;
              line-height: 100%;
              outline: none;
              text-decoration: none;
              -ms-interpolation-mode: bicubic;
            }
      
            .ReadMsgBody,
            .ExternalClass {
              width: 100%;
            }
      
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass td,
            .ExternalClass div {
              line-height: 100%;
            }
          </style>
          <!--[if gte mso 9]>
            <style type="text/css">
            li { text-indent: -1em; }
            table td { border-collapse: collapse; }
            </style>
            <![endif]-->
          <title> </title>
          <!-- content -->
          <!--[if gte mso 9]><xml>
             <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
             </o:OfficeDocumentSettings>
            </xml><![endif]-->
        </head>
        <body class="body" style="background-color: #000000; margin: 0; width: 100%;">
          <table class="bodyTable" role="presentation" width="100%" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; background-color: #000000; margin: 0;" bgcolor="#000000">
            <tr>
              <td class="body__content" align="left" width="100%" valign="top" style="color: #000000; font-size: 16px; line-height: 20px; font-family: Helvetica,Arial,sans-serif;">
                <div class="header" style="background-color: #000000; height: 100px; width: 100%; color: #000000; font-family: Helvetica,Arial,sans-serif;">
                  <div class="container" style="margin: 0 auto; max-width: 600px; width: 100%;"> <!--[if mso | IE]>
                    <table class="container__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-right: auto; margin-left: auto;width: 600px" width="600" align="center">
                      <tr>
                        <td> <![endif]-->
                          <table class="container__table" role="presentation" border="0" align="center" cellpadding="0" cellspacing="0" width="100%">
                            <tr class="container__row">
                              <td class="container__cell" width="100%" align="left" valign="top">
                                <div class="row">
                                  <table class="row__table" width="100%" align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
                                    <tr class="row__row"> <a class="logo-link a" large="12" href="${baseUrl}" style="width: min-content; color: #000000; text-decoration: none;"><span class="a__text" style="color: #000000; text-decoration: none;">
                <img class="logo img__block" src="${baseUrl}/images/apex-apps-logo.png" alt="
Apex Apps" border="0" style="display: block; max-width: 100%; white-space: pre; text-align: center; margin: 0 auto; font-size: 30px; color: #309772;"/>
                </span></a> </tr>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </table> <!--[if mso | IE]> </td>
                      </tr>
                    </table> <![endif]--> </div>
                </div>
                <div class="container" style="margin: 0 auto; max-width: 600px; width: 100%;"> <!--[if mso | IE]>
                  <table class="container__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-right: auto; margin-left: auto;width: 600px" width="600" align="center">
                    <tr>
                      <td> <![endif]-->
                        <table class="container__table" role="presentation" border="0" align="center" cellpadding="0" cellspacing="0" width="100%">
                          <tr class="container__row">
                            <td class="container__cell" width="100%" align="left" valign="top">
                              <div class="content row" style="border-left: 1px solid #CF3A19; margin: 10px 10px 30px; padding: 20px; background-color: #090909;">
                                <table class="row__table" width="100%" align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
                                  <tr class="row__row">
                                    <td class="column col-sm-12" width="600" style="width: 100%" align="left" valign="top">
                                      <h1 class="title header h1" style="margin: 20px 0; line-height: 40px; width: 100%; font-family: Helvetica,Arial,sans-serif; padding-left: 10px; background-color: transparent; margin-bottom: 20px; margin-top: 0; height: min-content; color: #BDBDBD; font-weight: 500;">Hi Aaron,</h1>
                                      <p class="content-text text p" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0 15px; color: #BDBDBD; font-size: 18px; margin: 0 0 5px;"> You just recieved a new call booking.</p>
                                      <p class="content-text text p" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0 15px; color: #BDBDBD; font-size: 18px; margin: 0 0 5px;"><br/>Name: ${name}</p>
                                      <p class="content-text text p" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0 15px; color: #BDBDBD; font-size: 18px; margin: 0 0 5px;"><br/> Time: ${moment
																				.unix(booking.timestamp)
																				.minute(0)
																				.format('h:mma dddd Do MMMM YYYY')} </p>
                                      <p class="content-text text p" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0 15px; color: #BDBDBD; font-size: 18px; margin: 0 0 5px;">
                                      <br/> Phone: ${phone} </p>
                                      <p class="content-text text p" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0 15px; color: #BDBDBD; font-size: 18px; margin: 0 0 5px;">
                                      <br/> Email: ${email} </p>
                                      <p class="content-text text p" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0 15px; color: #BDBDBD; font-size: 18px; margin: 0 0 5px;">
                                      <br/> Description: ${description}</p>
                                      <p class="content-text text p" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0 15px; color: #BDBDBD; font-size: 18px; margin: 0 0 5px;"><br/>
                                      <a class="cancel-link a" href="${baseUrl}/cancel/${
					booking._id
				}/admin" style="color: #AB3351; text-decoration: none;"><span class="a__text" style="color: #AB3351; text-decoration: none;">Cancel booking</span></a> </p>
                                    
                                    </td>
                                  </tr>
                                </table>
                              </div>
                            </td>
                          </tr>
                        </table> <!--[if mso | IE]> </td>
                    </tr>
                  </table> <![endif]--> </div>
                <div class="footer" style="background-color: #090909; height: min-content; width: 100%;">
                  <div class="container" style="margin: 0 auto; max-width: 600px; width: 100%;"> <!--[if mso | IE]>
                    <table class="container__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-right: auto; margin-left: auto;width: 600px" width="600" align="center">
                      <tr>
                        <td> <![endif]-->
                          <table class="container__table" role="presentation" border="0" align="center" cellpadding="0" cellspacing="0" width="100%">
                            <tr class="container__row">
                              <td class="container__cell" width="100%" align="left" valign="top">
                                <div class="footer-row row" style="padding: 10px 25px;">
                                  <table class="row__table" width="100%" align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
                                    <tr class="row__row">
                                      <p class="footer-text text p" large="2" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; color: #616161; font-size: 14px; padding: 0; margin: 0;">This email was sent by Apex Apps, ABN: 81700757157.</p>
                                      <p class="footer-text text p" large="2" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; color: #616161; font-size: 14px; padding: 0; margin: 0;">Make sure you add aaron@apexapps.dev to your address book and safe list.</p>
                                      <p class="footer-text text p" large="2" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; color: #616161; font-size: 14px; padding: 0; margin: 0;">You have recieved this email because your email address was used to confirm a booking at ApexApps.dev. This is not a promotional email.</p>
                                      <p class="footer-text footer-center text p" large="2" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; color: #616161; font-size: 14px; padding: 0; margin: 0; text-align: center;"><br/> &copy; Copyright ${moment().year()} Apex Apps</p>
                                      <p class="footer-text footer-center text p" large="4" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; color: #616161; font-size: 14px; padding: 0; margin: 0; text-align: center;">Designed and developed by <a class="link a" href="${baseUrl}" style="color: #309772; text-decoration: none;"><span class="a__text" style="color: #309772; text-decoration: none;">Apex Apps</span></a></p>
                                    </tr>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </table> <!--[if mso | IE]> </td>
                      </tr>
                    </table> <![endif]--> </div>
                </div>
              </td>
            </tr>
          </table>
          <div style="display:none; white-space:nowrap; font-size:15px; line-height:0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>
        </body>
      </html>
      `
			];
		case 'BOOKING_CANCEL_BY_CLIENT_TO_CLIENT':
			return [
				`Booking Cancelled`,
				`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" />
      <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head> </head>
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="x-apple-disable-message-reformatting" />
          <!--[if !mso]><!-->
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <!--<![endif]-->
          <style type="text/css">
            * {
              text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
              -moz-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
            }
      
            html {
              height: 100%;
              width: 100%;
            }
      
            body {
              height: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              width: 100% !important;
              mso-line-height-rule: exactly;
            }
      
            div[style*="margin: 16px 0"] {
              margin: 0 !important;
            }
      
            table,
            td {
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
            }
      
            img {
              border: 0;
              height: auto;
              line-height: 100%;
              outline: none;
              text-decoration: none;
              -ms-interpolation-mode: bicubic;
            }
      
            .ReadMsgBody,
            .ExternalClass {
              width: 100%;
            }
      
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass td,
            .ExternalClass div {
              line-height: 100%;
            }
          </style>
          <!--[if gte mso 9]>
            <style type="text/css">
            li { text-indent: -1em; }
            table td { border-collapse: collapse; }
            </style>
            <![endif]-->
          <title> </title>
          <!-- content -->
          <!--[if gte mso 9]><xml>
             <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
             </o:OfficeDocumentSettings>
            </xml><![endif]-->
        </head>
        <body class="body" style="background-color: #000000; margin: 0; width: 100%;">
          <table class="bodyTable" role="presentation" width="100%" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; background-color: #000000; margin: 0;" bgcolor="#000000">
            <tr>
              <td class="body__content" align="left" width="100%" valign="top" style="color: #000000; font-size: 16px; line-height: 20px; font-family: Helvetica,Arial,sans-serif;">
                <div class="header" style="background-color: #000000; height: 100px; width: 100%; color: #000000; font-family: Helvetica,Arial,sans-serif;">
                  <div class="container" style="margin: 0 auto; max-width: 600px; width: 100%;"> <!--[if mso | IE]>
                    <table class="container__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-right: auto; margin-left: auto;width: 600px" width="600" align="center">
                      <tr>
                        <td> <![endif]-->
                          <table class="container__table" role="presentation" border="0" align="center" cellpadding="0" cellspacing="0" width="100%">
                            <tr class="container__row">
                              <td class="container__cell" width="100%" align="left" valign="top">
                                <div class="row">
                                  <table class="row__table" width="100%" align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
                                    <tr class="row__row"> <a class="logo-link a" large="12" href="${baseUrl}" style="width: min-content; color: #000000; text-decoration: none;"><span class="a__text" style="color: #000000; text-decoration: none;">
                <img class="logo img__block" src="${baseUrl}/images/apex-apps-logo.png" alt="
Apex Apps" border="0" style="display: block; max-width: 100%; white-space: pre; text-align: center; margin: 0 auto; font-size: 30px; color: #309772;"/>
                </span></a> </tr>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </table> <!--[if mso | IE]> </td>
                      </tr>
                    </table> <![endif]--> </div>
                </div>
                <div class="container" style="margin: 0 auto; max-width: 600px; width: 100%;"> <!--[if mso | IE]>
                  <table class="container__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-right: auto; margin-left: auto;width: 600px" width="600" align="center">
                    <tr>
                      <td> <![endif]-->
                        <table class="container__table" role="presentation" border="0" align="center" cellpadding="0" cellspacing="0" width="100%">
                          <tr class="container__row">
                            <td class="container__cell" width="100%" align="left" valign="top">
                              <div class="content row" style="border-left: 1px solid #CF3A19; margin: 10px 10px 30px; padding: 20px; background-color: #090909;">
                                <table class="row__table" width="100%" align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
                                  <tr class="row__row">
                                    <td class="column col-sm-12" width="600" style="width: 100%" align="left" valign="top">
                                      <h1 class="title header h1" style="margin: 20px 0; line-height: 40px; width: 100%; font-family: Helvetica,Arial,sans-serif; padding-left: 10px; background-color: transparent; margin-bottom: 20px; margin-top: 0; height: min-content; color: #BDBDBD; font-weight: 500;">Hi ${name},</h1>
                                      <p class="content-text text p" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0 15px; color: #BDBDBD; font-size: 18px; margin: 0 0 5px;"> Your booking has successfully been cancelled. Feel free to make another booking anytime!</p>
                                        <p class="content-text signature1 text p" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0 15px; color: #BDBDBD; font-size: 18px; margin: 0 0 5px; margin-left: 20px;"><br/> Kind Regards,</p>
                                        <p class="content-text signature2 text p" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0 15px; color: #BDBDBD; font-size: 18px; margin: 0 0 5px; font-style: italic; margin-left: 40px;">Aaron Gazzola</p>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                            </td>
                          </tr>
                        </table> <!--[if mso | IE]> </td>
                    </tr>
                  </table> <![endif]--> </div>
                <div class="footer" style="background-color: #090909; height: min-content; width: 100%;">
                  <div class="container" style="margin: 0 auto; max-width: 600px; width: 100%;"> <!--[if mso | IE]>
                    <table class="container__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-right: auto; margin-left: auto;width: 600px" width="600" align="center">
                      <tr>
                        <td> <![endif]-->
                          <table class="container__table" role="presentation" border="0" align="center" cellpadding="0" cellspacing="0" width="100%">
                            <tr class="container__row">
                              <td class="container__cell" width="100%" align="left" valign="top">
                                <div class="footer-row row" style="padding: 10px 25px;">
                                  <table class="row__table" width="100%" align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
                                    <tr class="row__row">
                                      <p class="footer-text text p" large="2" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; color: #616161; font-size: 14px; padding: 0; margin: 0;">This email was sent by Apex Apps, ABN: 81700757157.</p>
                                      <p class="footer-text text p" large="2" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; color: #616161; font-size: 14px; padding: 0; margin: 0;">Make sure you add aaron@apexapps.dev to your address book and safe list.</p>
                                      <p class="footer-text text p" large="2" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; color: #616161; font-size: 14px; padding: 0; margin: 0;">You have recieved this email because your email address was used to cancel a booking at ApexApps.dev. This is not a promotional email.</p>
                                      <p class="footer-text footer-center text p" large="2" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; color: #616161; font-size: 14px; padding: 0; margin: 0; text-align: center;"><br/> &copy; Copyright ${moment().year()} Apex Apps</p>
                                      <p class="footer-text footer-center text p" large="4" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; color: #616161; font-size: 14px; padding: 0; margin: 0; text-align: center;">Designed and developed by <a class="link a" href="${baseUrl}" style="color: #309772; text-decoration: none;"><span class="a__text" style="color: #309772; text-decoration: none;">Apex Apps</span></a></p>
                                    </tr>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </table> <!--[if mso | IE]> </td>
                      </tr>
                    </table> <![endif]--> </div>
                </div>
              </td>
            </tr>
          </table>
          <div style="display:none; white-space:nowrap; font-size:15px; line-height:0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>
        </body>
      </html>
        `
			];
		case 'BOOKING_CANCEL_BY_CLIENT_TO_ADMIN':
			return [
				`Booking Cancelled by client: ${moment
					.unix(booking.timestamp)
					.minute(0)
					.format('h:mma dddd Do')}`,
				`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" />
      <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head> </head>
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="x-apple-disable-message-reformatting" />
          <!--[if !mso]><!-->
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <!--<![endif]-->
          <style type="text/css">
            * {
              text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
              -moz-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
            }
      
            html {
              height: 100%;
              width: 100%;
            }
      
            body {
              height: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              width: 100% !important;
              mso-line-height-rule: exactly;
            }
      
            div[style*="margin: 16px 0"] {
              margin: 0 !important;
            }
      
            table,
            td {
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
            }
      
            img {
              border: 0;
              height: auto;
              line-height: 100%;
              outline: none;
              text-decoration: none;
              -ms-interpolation-mode: bicubic;
            }
      
            .ReadMsgBody,
            .ExternalClass {
              width: 100%;
            }
      
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass td,
            .ExternalClass div {
              line-height: 100%;
            }
          </style>
          <!--[if gte mso 9]>
            <style type="text/css">
            li { text-indent: -1em; }
            table td { border-collapse: collapse; }
            </style>
            <![endif]-->
          <title> </title>
          <!-- content -->
          <!--[if gte mso 9]><xml>
             <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
             </o:OfficeDocumentSettings>
            </xml><![endif]-->
        </head>
        <body class="body" style="background-color: #000000; margin: 0; width: 100%;">
          <table class="bodyTable" role="presentation" width="100%" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; background-color: #000000; margin: 0;" bgcolor="#000000">
            <tr>
              <td class="body__content" align="left" width="100%" valign="top" style="color: #000000; font-size: 16px; line-height: 20px; font-family: Helvetica,Arial,sans-serif;">
                <div class="header" style="background-color: #000000; height: 100px; width: 100%; color: #000000; font-family: Helvetica,Arial,sans-serif;">
                  <div class="container" style="margin: 0 auto; max-width: 600px; width: 100%;"> <!--[if mso | IE]>
                    <table class="container__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-right: auto; margin-left: auto;width: 600px" width="600" align="center">
                      <tr>
                        <td> <![endif]-->
                          <table class="container__table" role="presentation" border="0" align="center" cellpadding="0" cellspacing="0" width="100%">
                            <tr class="container__row">
                              <td class="container__cell" width="100%" align="left" valign="top">
                                <div class="row">
                                  <table class="row__table" width="100%" align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
                                    <tr class="row__row"> <a class="logo-link a" large="12" href="${baseUrl}" style="width: min-content; color: #000000; text-decoration: none;"><span class="a__text" style="color: #000000; text-decoration: none;">
                <img class="logo img__block" src="${baseUrl}/images/apex-apps-logo.png" alt="
Apex Apps" border="0" style="display: block; max-width: 100%; white-space: pre; text-align: center; margin: 0 auto; font-size: 30px; color: #309772;"/>
                </span></a> </tr>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </table> <!--[if mso | IE]> </td>
                      </tr>
                    </table> <![endif]--> </div>
                </div>
                <div class="container" style="margin: 0 auto; max-width: 600px; width: 100%;"> <!--[if mso | IE]>
                  <table class="container__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-right: auto; margin-left: auto;width: 600px" width="600" align="center">
                    <tr>
                      <td> <![endif]-->
                        <table class="container__table" role="presentation" border="0" align="center" cellpadding="0" cellspacing="0" width="100%">
                          <tr class="container__row">
                            <td class="container__cell" width="100%" align="left" valign="top">
                              <div class="content row" style="border-left: 1px solid #CF3A19; margin: 10px 10px 30px; padding: 20px; background-color: #090909;">
                                <table class="row__table" width="100%" align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
                                  <tr class="row__row">
                                    <td class="column col-sm-12" width="600" style="width: 100%" align="left" valign="top">
                                      <h1 class="title header h1" style="margin: 20px 0; line-height: 40px; width: 100%; font-family: Helvetica,Arial,sans-serif; padding-left: 10px; background-color: transparent; margin-bottom: 20px; margin-top: 0; height: min-content; color: #BDBDBD; font-weight: 500;">Hi Aaron,</h1>
                                      <p class="content-text text p" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0 15px; color: #BDBDBD; font-size: 18px; margin: 0 0 5px;"> A client has just cancelled their booking.</p>
                                      <p class="content-text text p" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0 15px; color: #BDBDBD; font-size: 18px; margin: 0 0 5px;"><br/>Name: ${name}</p>
                                      <p class="content-text text p" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0 15px; color: #BDBDBD; font-size: 18px; margin: 0 0 5px;"><br/> Time: ${moment
																				.unix(booking.timestamp)
																				.minute(0)
																				.format('h:mma dddd Do MMMM YYYY')} </p>
                                      <p class="content-text text p" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0 15px; color: #BDBDBD; font-size: 18px; margin: 0 0 5px;">
                                      <br/> Phone: ${phone} </p>
                                      <p class="content-text text p" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0 15px; color: #BDBDBD; font-size: 18px; margin: 0 0 5px;">
                                      <br/> Email: ${email} </p>
                                      <p class="content-text text p" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0 15px; color: #BDBDBD; font-size: 18px; margin: 0 0 5px;">
                                      <br/> Description: ${description}</p>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                            </td>
                          </tr>
                        </table> <!--[if mso | IE]> </td>
                    </tr>
                  </table> <![endif]--> </div>
                <div class="footer" style="background-color: #090909; height: min-content; width: 100%;">
                  <div class="container" style="margin: 0 auto; max-width: 600px; width: 100%;"> <!--[if mso | IE]>
                    <table class="container__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-right: auto; margin-left: auto;width: 600px" width="600" align="center">
                      <tr>
                        <td> <![endif]-->
                          <table class="container__table" role="presentation" border="0" align="center" cellpadding="0" cellspacing="0" width="100%">
                            <tr class="container__row">
                              <td class="container__cell" width="100%" align="left" valign="top">
                                <div class="footer-row row" style="padding: 10px 25px;">
                                  <table class="row__table" width="100%" align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
                                    <tr class="row__row">
                                      <p class="footer-text text p" large="2" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; color: #616161; font-size: 14px; padding: 0; margin: 0;">This email was sent by Apex Apps, ABN: 81700757157.</p>
                                      <p class="footer-text text p" large="2" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; color: #616161; font-size: 14px; padding: 0; margin: 0;">Make sure you add aaron@apexapps.dev to your address book and safe list.</p>
                                      <p class="footer-text text p" large="2" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; color: #616161; font-size: 14px; padding: 0; margin: 0;">You have recieved this email because your email address was used to confirm a booking at ApexApps.dev. This is not a promotional email.</p>
                                      <p class="footer-text footer-center text p" large="2" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; color: #616161; font-size: 14px; padding: 0; margin: 0; text-align: center;"><br/> &copy; Copyright ${moment().year()} Apex Apps</p>
                                      <p class="footer-text footer-center text p" large="4" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; color: #616161; font-size: 14px; padding: 0; margin: 0; text-align: center;">Designed and developed by <a class="link a" href="${baseUrl}" style="color: #309772; text-decoration: none;"><span class="a__text" style="color: #309772; text-decoration: none;">Apex Apps</span></a></p>
                                    </tr>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </table> <!--[if mso | IE]> </td>
                      </tr>
                    </table> <![endif]--> </div>
                </div>
              </td>
            </tr>
          </table>
          <div style="display:none; white-space:nowrap; font-size:15px; line-height:0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>
        </body>
      </html>
      `
			];
		case 'BOOKING_CANCEL_BY_ADMIN_TO_CLIENT':
			return [
				`Sorry, your booking has been cancelled`,
				`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" />
      <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head> </head>
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="x-apple-disable-message-reformatting" />
          <!--[if !mso]><!-->
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <!--<![endif]-->
          <style type="text/css">
            * {
              text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
              -moz-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
            }
      
            html {
              height: 100%;
              width: 100%;
            }
      
            body {
              height: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              width: 100% !important;
              mso-line-height-rule: exactly;
            }
      
            div[style*="margin: 16px 0"] {
              margin: 0 !important;
            }
      
            table,
            td {
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
            }
      
            img {
              border: 0;
              height: auto;
              line-height: 100%;
              outline: none;
              text-decoration: none;
              -ms-interpolation-mode: bicubic;
            }
      
            .ReadMsgBody,
            .ExternalClass {
              width: 100%;
            }
      
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass td,
            .ExternalClass div {
              line-height: 100%;
            }
          </style>
          <!--[if gte mso 9]>
            <style type="text/css">
            li { text-indent: -1em; }
            table td { border-collapse: collapse; }
            </style>
            <![endif]-->
          <title> </title>
          <!-- content -->
          <!--[if gte mso 9]><xml>
             <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
             </o:OfficeDocumentSettings>
            </xml><![endif]-->
        </head>
        <body class="body" style="background-color: #000000; margin: 0; width: 100%;">
          <table class="bodyTable" role="presentation" width="100%" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; background-color: #000000; margin: 0;" bgcolor="#000000">
            <tr>
              <td class="body__content" align="left" width="100%" valign="top" style="color: #000000; font-size: 16px; line-height: 20px; font-family: Helvetica,Arial,sans-serif;">
                <div class="header" style="background-color: #000000; height: 100px; width: 100%; color: #000000; font-family: Helvetica,Arial,sans-serif;">
                  <div class="container" style="margin: 0 auto; max-width: 600px; width: 100%;"> <!--[if mso | IE]>
                    <table class="container__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-right: auto; margin-left: auto;width: 600px" width="600" align="center">
                      <tr>
                        <td> <![endif]-->
                          <table class="container__table" role="presentation" border="0" align="center" cellpadding="0" cellspacing="0" width="100%">
                            <tr class="container__row">
                              <td class="container__cell" width="100%" align="left" valign="top">
                                <div class="row">
                                  <table class="row__table" width="100%" align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
                                    <tr class="row__row"> <a class="logo-link a" large="12" href="${baseUrl}" style="width: min-content; color: #000000; text-decoration: none;"><span class="a__text" style="color: #000000; text-decoration: none;">
                <img class="logo img__block" src="${baseUrl}/images/apex-apps-logo.png" alt="
Apex Apps" border="0" style="display: block; max-width: 100%; white-space: pre; text-align: center; margin: 0 auto; font-size: 30px; color: #309772;"/>
                </span></a> </tr>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </table> <!--[if mso | IE]> </td>
                      </tr>
                    </table> <![endif]--> </div>
                </div>
                <div class="container" style="margin: 0 auto; max-width: 600px; width: 100%;"> <!--[if mso | IE]>
                  <table class="container__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-right: auto; margin-left: auto;width: 600px" width="600" align="center">
                    <tr>
                      <td> <![endif]-->
                        <table class="container__table" role="presentation" border="0" align="center" cellpadding="0" cellspacing="0" width="100%">
                          <tr class="container__row">
                            <td class="container__cell" width="100%" align="left" valign="top">
                              <div class="content row" style="border-left: 1px solid #CF3A19; margin: 10px 10px 30px; padding: 20px; background-color: #090909;">
                                <table class="row__table" width="100%" align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
                                  <tr class="row__row">
                                    <td class="column col-sm-12" width="600" style="width: 100%" align="left" valign="top">
                                      <h1 class="title header h1" style="margin: 20px 0; line-height: 40px; width: 100%; font-family: Helvetica,Arial,sans-serif; padding-left: 10px; background-color: transparent; margin-bottom: 20px; margin-top: 0; height: min-content; color: #BDBDBD; font-weight: 500;">Hi ${name},</h1>
                                      <p class="content-text text p" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0 15px; color: #BDBDBD; font-size: 18px; margin: 0 0 5px;">I'm sorry for the inconvenience, but your booking has been cancelled.<br/><br/>
                                      I will be in touch to arrange another call. <br/><br/>You can also contact me by replying to this email, or booking another call.
                                      </p>
                                        <p class="content-text signature1 text p" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0 15px; color: #BDBDBD; font-size: 18px; margin: 0 0 5px; margin-left: 20px;"><br/> Kind Regards,</p>
                                        <p class="content-text signature2 text p" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0 15px; color: #BDBDBD; font-size: 18px; margin: 0 0 5px; font-style: italic; margin-left: 40px;">Aaron Gazzola</p>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                            </td>
                          </tr>
                        </table> <!--[if mso | IE]> </td>
                    </tr>
                  </table> <![endif]--> </div>
                <div class="footer" style="background-color: #090909; height: min-content; width: 100%;">
                  <div class="container" style="margin: 0 auto; max-width: 600px; width: 100%;"> <!--[if mso | IE]>
                    <table class="container__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-right: auto; margin-left: auto;width: 600px" width="600" align="center">
                      <tr>
                        <td> <![endif]-->
                          <table class="container__table" role="presentation" border="0" align="center" cellpadding="0" cellspacing="0" width="100%">
                            <tr class="container__row">
                              <td class="container__cell" width="100%" align="left" valign="top">
                                <div class="footer-row row" style="padding: 10px 25px;">
                                  <table class="row__table" width="100%" align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
                                    <tr class="row__row">
                                      <p class="footer-text text p" large="2" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; color: #616161; font-size: 14px; padding: 0; margin: 0;">This email was sent by Apex Apps, ABN: 81700757157.</p>
                                      <p class="footer-text text p" large="2" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; color: #616161; font-size: 14px; padding: 0; margin: 0;">Make sure you add aaron@apexapps.dev to your address book and safe list.</p>
                                      <p class="footer-text text p" large="2" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; color: #616161; font-size: 14px; padding: 0; margin: 0;">You have recieved this email because your email address was used to create a booking at ApexApps.dev. This is not a promotional email.</p>
                                      <p class="footer-text footer-center text p" large="2" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; color: #616161; font-size: 14px; padding: 0; margin: 0; text-align: center;"><br/> &copy; Copyright ${moment().year()} Apex Apps</p>
                                      <p class="footer-text footer-center text p" large="4" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; color: #616161; font-size: 14px; padding: 0; margin: 0; text-align: center;">Designed and developed by <a class="link a" href="${baseUrl}" style="color: #309772; text-decoration: none;"><span class="a__text" style="color: #309772; text-decoration: none;">Apex Apps</span></a></p>
                                    </tr>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </table> <!--[if mso | IE]> </td>
                      </tr>
                    </table> <![endif]--> </div>
                </div>
              </td>
            </tr>
          </table>
          <div style="display:none; white-space:nowrap; font-size:15px; line-height:0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>
        </body>
      </html>
        `
			];
		case 'BOOKING_CANCEL_BY_ADMIN_TO_ADMIN':
			return [
				`You have cancelled a booking: ${moment
					.unix(booking.timestamp)
					.minute(0)
					.format('h:mma dddd Do')}`,
				`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" />
      <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head> </head>
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="x-apple-disable-message-reformatting" />
          <!--[if !mso]><!-->
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <!--<![endif]-->
          <style type="text/css">
            * {
              text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
              -moz-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
            }
      
            html {
              height: 100%;
              width: 100%;
            }
      
            body {
              height: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              width: 100% !important;
              mso-line-height-rule: exactly;
            }
      
            div[style*="margin: 16px 0"] {
              margin: 0 !important;
            }
      
            table,
            td {
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
            }
      
            img {
              border: 0;
              height: auto;
              line-height: 100%;
              outline: none;
              text-decoration: none;
              -ms-interpolation-mode: bicubic;
            }
      
            .ReadMsgBody,
            .ExternalClass {
              width: 100%;
            }
      
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass td,
            .ExternalClass div {
              line-height: 100%;
            }
          </style>
          <!--[if gte mso 9]>
            <style type="text/css">
            li { text-indent: -1em; }
            table td { border-collapse: collapse; }
            </style>
            <![endif]-->
          <title> </title>
          <!-- content -->
          <!--[if gte mso 9]><xml>
             <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
             </o:OfficeDocumentSettings>
            </xml><![endif]-->
        </head>
        <body class="body" style="background-color: #000000; margin: 0; width: 100%;">
          <table class="bodyTable" role="presentation" width="100%" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; background-color: #000000; margin: 0;" bgcolor="#000000">
            <tr>
              <td class="body__content" align="left" width="100%" valign="top" style="color: #000000; font-size: 16px; line-height: 20px; font-family: Helvetica,Arial,sans-serif;">
                <div class="header" style="background-color: #000000; height: 100px; width: 100%; color: #000000; font-family: Helvetica,Arial,sans-serif;">
                  <div class="container" style="margin: 0 auto; max-width: 600px; width: 100%;"> <!--[if mso | IE]>
                    <table class="container__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-right: auto; margin-left: auto;width: 600px" width="600" align="center">
                      <tr>
                        <td> <![endif]-->
                          <table class="container__table" role="presentation" border="0" align="center" cellpadding="0" cellspacing="0" width="100%">
                            <tr class="container__row">
                              <td class="container__cell" width="100%" align="left" valign="top">
                                <div class="row">
                                  <table class="row__table" width="100%" align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
                                    <tr class="row__row"> <a class="logo-link a" large="12" href="${baseUrl}" style="width: min-content; color: #000000; text-decoration: none;"><span class="a__text" style="color: #000000; text-decoration: none;">
                <img class="logo img__block" src="${baseUrl}/images/apex-apps-logo.png" alt="
Apex Apps" border="0" style="display: block; max-width: 100%; white-space: pre; text-align: center; margin: 0 auto; font-size: 30px; color: #309772;"/>
                </span></a> </tr>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </table> <!--[if mso | IE]> </td>
                      </tr>
                    </table> <![endif]--> </div>
                </div>
                <div class="container" style="margin: 0 auto; max-width: 600px; width: 100%;"> <!--[if mso | IE]>
                  <table class="container__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-right: auto; margin-left: auto;width: 600px" width="600" align="center">
                    <tr>
                      <td> <![endif]-->
                        <table class="container__table" role="presentation" border="0" align="center" cellpadding="0" cellspacing="0" width="100%">
                          <tr class="container__row">
                            <td class="container__cell" width="100%" align="left" valign="top">
                              <div class="content row" style="border-left: 1px solid #CF3A19; margin: 10px 10px 30px; padding: 20px; background-color: #090909;">
                                <table class="row__table" width="100%" align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
                                  <tr class="row__row">
                                    <td class="column col-sm-12" width="600" style="width: 100%" align="left" valign="top">
                                      <h1 class="title header h1" style="margin: 20px 0; line-height: 40px; width: 100%; font-family: Helvetica,Arial,sans-serif; padding-left: 10px; background-color: transparent; margin-bottom: 20px; margin-top: 0; height: min-content; color: #BDBDBD; font-weight: 500;">Hi Aaron,</h1>
                                      <p class="content-text text p" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0 15px; color: #BDBDBD; font-size: 18px; margin: 0 0 5px;"> You have cancelled a booking</p>
                                      <p class="content-text text p" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0 15px; color: #BDBDBD; font-size: 18px; margin: 0 0 5px;"><br/>Name: ${name}</p>
                                      <p class="content-text text p" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0 15px; color: #BDBDBD; font-size: 18px; margin: 0 0 5px;"><br/> Time: ${moment
																				.unix(booking.timestamp)
																				.minute(0)
																				.format('h:mma dddd Do MMMM YYYY')} </p>
                                      <p class="content-text text p" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0 15px; color: #BDBDBD; font-size: 18px; margin: 0 0 5px;">
                                      <br/> Phone: ${phone} </p>
                                      <p class="content-text text p" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0 15px; color: #BDBDBD; font-size: 18px; margin: 0 0 5px;">
                                      <br/> Email: ${email} </p>
                                      <p class="content-text text p" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0 15px; color: #BDBDBD; font-size: 18px; margin: 0 0 5px;">
                                      <br/> Description: ${description}</p>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                            </td>
                          </tr>
                        </table> <!--[if mso | IE]> </td>
                    </tr>
                  </table> <![endif]--> </div>
                <div class="footer" style="background-color: #090909; height: min-content; width: 100%;">
                  <div class="container" style="margin: 0 auto; max-width: 600px; width: 100%;"> <!--[if mso | IE]>
                    <table class="container__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-right: auto; margin-left: auto;width: 600px" width="600" align="center">
                      <tr>
                        <td> <![endif]-->
                          <table class="container__table" role="presentation" border="0" align="center" cellpadding="0" cellspacing="0" width="100%">
                            <tr class="container__row">
                              <td class="container__cell" width="100%" align="left" valign="top">
                                <div class="footer-row row" style="padding: 10px 25px;">
                                  <table class="row__table" width="100%" align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
                                    <tr class="row__row">
                                      <p class="footer-text text p" large="2" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; color: #616161; font-size: 14px; padding: 0; margin: 0;">This email was sent by Apex Apps, ABN: 81700757157.</p>
                                      <p class="footer-text text p" large="2" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; color: #616161; font-size: 14px; padding: 0; margin: 0;">Make sure you add aaron@apexapps.dev to your address book and safe list.</p>
                                      <p class="footer-text text p" large="2" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; color: #616161; font-size: 14px; padding: 0; margin: 0;">You have recieved this email because your email address was used to confirm a booking at ApexApps.dev. This is not a promotional email.</p>
                                      <p class="footer-text footer-center text p" large="2" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; color: #616161; font-size: 14px; padding: 0; margin: 0; text-align: center;"><br/> &copy; Copyright ${moment().year()} Apex Apps</p>
                                      <p class="footer-text footer-center text p" large="4" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; color: #616161; font-size: 14px; padding: 0; margin: 0; text-align: center;">Designed and developed by <a class="link a" href="${baseUrl}" style="color: #309772; text-decoration: none;"><span class="a__text" style="color: #309772; text-decoration: none;">Apex Apps</span></a></p>
                                    </tr>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </table> <!--[if mso | IE]> </td>
                      </tr>
                    </table> <![endif]--> </div>
                </div>
              </td>
            </tr>
          </table>
          <div style="display:none; white-space:nowrap; font-size:15px; line-height:0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>
        </body>
      </html>
      `
			];
		default:
			break;
	}
};

export default useHtmlTemplate;
