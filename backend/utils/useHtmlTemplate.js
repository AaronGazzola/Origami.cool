import moment from 'moment';

const useHtmlTemplate = ({ type, baseUrl, user, token }) => {
	switch (type) {
		case 'CLIENT_CONFIRM_BOOKING':
			return [
				`Please verify your email address`,
				`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" />
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
          <body class="body" style="background-color: #FFFAF0; background-color: rgba(255,250,240,1); margin: 0; width: 100%;">
            <table class="bodyTable" role="presentation" width="100%" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; background-color: #FFFAF0; background-color: rgba(255,250,240,1); margin: 0;" bgcolor="rgba(255,250,240,1)">
              <tr>
                <td class="body__content" align="left" width="100%" valign="top" style="color: #000000; font-size: 16px; line-height: 20px; font-family: Helvetica,Arial,sans-serif;">
                  <div class="header" style="height: 100px; width: 100%; color: #000000; font-family: Helvetica,Arial,sans-serif;">
                    <div class="container" style="margin: 0 auto; max-width: 600px; width: 100%;"> <!--[if mso | IE]>
                      <table class="container__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-right: auto; margin-left: auto;width: 600px" width="600" align="center">
                        <tr>
                          <td> <![endif]-->
                            <table class="container__table" role="presentation" border="0" align="center" cellpadding="0" cellspacing="0" width="100%">
                              <tr class="container__row">
                                <td class="container__cell" width="100%" align="left" valign="top">
                                  <div class="row">
                                    <table class="row__table" width="100%" align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
                                      <tr class="row__row"> <a class="link a" large="12" href="${baseUrl}" style="color: #026A97; text-decoration: none;"><span class="a__text" style="color: #026A97; text-decoration: none;">
                    <img class="logo img__block" src="${baseUrl}/images/logo.png" alt="
        Origami.cool" border="0" style="display: block; max-width: 100%; white-space: pre; margin-top: 4px; margin-left: 30px; font-size: 30px; color: rgba(175,125, 60,1); color: #AF7D3C;"/>
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
                                <div class="content row" style="background-color: #FFFFFF; border: 1px solid #AF7D3C; border: 1px solid rgba(175,125, 60,1); border-radius: 8px; margin: 10px; padding: 20px;">
                                  <table class="row__table" width="100%" align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
                                    <tr class="row__row">
                                      <td class="column col-sm-12" width="600" style="width: 100%" align="left" valign="top">
                                        <div class="row">
                                          <table class="row__table" width="100%" align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
                                            <tr class="row__row">
                                              <td class="column col-sm-12" width="600" style="width: 100%" align="left" valign="top">
                                                <h1 class="title header h1" style="margin: 20px 0; line-height: 40px; width: 100%; color: #000000; font-family: Helvetica,Arial,sans-serif; padding-left: 10px; background-color: #FFFFFF; margin-bottom: 20px; margin-top: 0; height: min-content; font-weight: 500;">Hi ${
																									user.name
																								},</h1>
                                                <p class="subtitle text p" style="display: block; color: #000000; line-height: 20px; font-family: Helvetica,Arial,sans-serif; margin: 0; padding-left: 10px; font-size: 20px; margin-bottom: 10px;">Thank you for creating an account at <a class="link a" href="${baseUrl}" style="color: #026A97; text-decoration: none;"><span class="a__text" style="color: #026A97; text-decoration: none;">Origami.cool</span></a></p>
                                                <p
                                                  class="subtitle text p" style="display: block; color: #000000; line-height: 20px; font-family: Helvetica,Arial,sans-serif; margin: 0; padding-left: 10px; font-size: 20px; margin-bottom: 10px;"> Please click the link below to verify your email address. </p>
                                                  <div class="secondary-button button" style="background-color: #2A7855; background-color: rgba(42,120,85,1); margin-top: 10px;">
                                                    <table role="presentation" width="100%" align="left" border="0" cellpadding="0" cellspacing="0">
                                                      <tr>
                                                        <td>
                                                          <table role="presentation" width="auto" align="center" border="0" cellspacing="0" cellpadding="0" class="button__table" style="margin: 0 auto; margin-top: 10px;">
                                                            <tr>
                  <td align="center" class="button__cell" style="border-radius: 3px; padding: 6px 12px; background-color: #2A7855; background-color: rgba(42,120,85,1);" bgcolor="rgba(42,120,85,1)"><a href="${baseUrl}/verify/${token}" class="button__link" style="color: #FFFFFF; text-decoration: none; background-color: #2A7855; background-color: rgba(42,120,85,1); display: inline-block;"><span class="button__text" style="color: #FFFFFF; text-decoration: none;">
                        Verify Email
                      </span></a></td>
                                                            </tr>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </div>
                                              </td>
                                            </tr>
                                          </table>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </table> <!--[if mso | IE]> </td>
                      </tr>
                    </table> <![endif]--> </div>
                  <div class="footer" style="height: min-content; width: 100%;">
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
                                        <p class="footer-text text p" large="2" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0; color: #424242; font-size: 11px; margin: 0;"> This email was sent by Apex Apps, ABN: 81700757157 via Origami.cool </p>
                                        <p class="footer-text text p" large="2" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0; color: #424242; font-size: 11px; margin: 0;">
                                        Make sure you add aaron@origami.cool to your address book and safe list. </p>
                                        <p class="footer-text text p" large="2" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0; color: #424242; font-size: 11px; margin: 0;">
                                        You have recieved this email because your email address was used to create an account at Origami.cool, this is not a promotional email. </p>
                                        <p class="footer-center text p" large="2" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0; color: #424242; font-size: 11px; margin: 0; text-align: center;">
                                        &copy; Copyright ${moment().year()}, <a class="link a" href="https://www.apexapps.dev" style="color: #026A97; text-decoration: none;"><span class="a__text" style="color: #026A97; text-decoration: none;">Apex Apps</span></a> </p>
                                        <p class="footer-center text p"
                                          large="2" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0; color: #424242; font-size: 11px; margin: 0; text-align: center;"> Designed and developed by <a class="link a" href="https://www.apexapps.dev" style="color: #026A97; text-decoration: none;"><span class="a__text" style="color: #026A97; text-decoration: none;">Apex Apps</span></a> </p>
                                        <p class="footer-center text p"
                                          large="2" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0; color: #424242; font-size: 11px; margin: 0; text-align: center;"><a class="link a" href="${baseUrl}/terms" style="color: #026A97; text-decoration: none;"><span class="a__text" style="color: #026A97; text-decoration: none;">Terms and Conditions</span></a></p>
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
        </html>`
			];
		default:
			break;
	}
};

export default useHtmlTemplate;
