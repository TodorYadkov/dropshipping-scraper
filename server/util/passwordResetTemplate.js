export const passwordResetTemplate = (resetLink) => {
    return (
        `
        <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet" type="text/css"><!--<![endif]-->
    <style>
        * {
            box-sizing: border-box
        }

        body {
            margin: 0;
            padding: 0
        }

        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important
        }

        #MessageViewBody a {
            color: inherit;
            text-decoration: none
        }

        p {
            line-height: inherit
        }

        .desktop_hide,
        .desktop_hide table {
            mso-hide: all;
            display: none;
            max-height: 0;
            overflow: hidden
        }

        .image_block img+div {
            display: none
        }

        @media (max-width:670px) {
            .social_block.desktop_hide .social-table {
                display: inline-block !important
            }

            .mobile_hide {
                display: none
            }

            .row-content {
                width: 100% !important
            }

            .stack .column {
                width: 100%;
                display: block
            }

            .mobile_hide {
                min-height: 0;
                max-height: 0;
                max-width: 0;
                overflow: hidden;
                font-size: 0
            }

            .desktop_hide,
            .desktop_hide table {
                display: table !important;
                max-height: none !important
            }
        }
    </style>
</head>

<body style="background-color:#85a4cd;margin:0;padding:0;-webkit-text-size-adjust:none;text-size-adjust:none">
    <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
        style="mso-table-lspace:0;mso-table-rspace:0;background-color:#85a4cd">
        <tbody>
            <tr>
                <td>
                    <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                        role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#f3f6fe">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0"
                                        cellspacing="0" role="presentation"
                                        style="mso-table-lspace:0;mso-table-rspace:0;color:#000;width:650px;margin:0 auto"
                                        width="650">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%"
                                                    style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:15px;padding-top:15px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0">
                                                    <table class="image_block block-1" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0">
                                                        <tbody>
                                                            <tr style="text-align:center;">
                                                                <td class="pad" style="width:100%">
                                                                    <div
                                                                        style="display:flex;align-items:center;margin:0 1rem;cursor:default;">
                                                                        <svg style="width:3rem;height:3rem;"
                                                                            viewBox="0 0 512 512" fill="none">
                                                                            <path
                                                                                d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z"
                                                                                fill="#4C51BF" stroke="#4C51BF"
                                                                                strokeWidth="2" strokeLinecap="round"
                                                                                strokeLinejoin="round" />
                                                                            <path
                                                                                d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z"
                                                                                fill="white" />
                                                                        </svg>

                                                                        <p
                                                                            style="text-align:center;margin-left:0.5rem;font-size:1.5rem;font-weight:600;color:#333333;">
                                                                            Amazon Scraper
                                                                        </p>
                                                                    </div>

                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                        role="presentation" style="mso-table-lspace:0;mso-table-rspace:0">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0"
                                        cellspacing="0" role="presentation"
                                        style="mso-table-lspace:0;mso-table-rspace:0;color:#000;width:650px;margin:0 auto"
                                        width="650">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%"
                                                    style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:5px;padding-top:5px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0">
                                                    <div class="spacer_block block-1"
                                                        style="height:60px;line-height:60px;font-size:1px"> </div>
                                                    <table class="heading_block block-2" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0">
                                                        <tbody>
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:10px;text-align:center;width:100%">
                                                                    <h1
                                                                        style="margin:0;color:#fff;direction:ltr;font-family:'Roboto Slab',Arial,'Helvetica Neue',Helvetica,sans-serif;font-size:30px;font-weight:400;letter-spacing:2px;line-height:120%;text-align:center;margin-top:0;margin-bottom:0">
                                                                        <strong>FORGOT YOUR PASSWORD?</strong>
                                                                    </h1>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <table class="image_block block-3" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0">
                                                        <tbody>
                                                            <tr>
                                                                <td class="pad" style="width:100%">
                                                                    <div class="alignment" align="center"
                                                                        style="line-height:10px"><img
                                                                            src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/3856/GIF_password.gif"
                                                                            style="display:block;height:auto;border:0;max-width:500px;width:100%"
                                                                            width="500" alt="Wrong Password Animation"
                                                                            title="Wrong Password Animation"></div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <div class="spacer_block block-4"
                                                        style="height:20px;line-height:20px;font-size:1px"> </div>
                                                    <table class="paragraph_block block-5" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word">
                                                        <tbody>
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:5px;padding-left:10px;padding-right:10px;padding-top:5px">
                                                                    <div
                                                                        style="color:#3f4d75;font-family:Roboto Slab,Arial,Helvetica Neue,Helvetica,sans-serif;font-size:20px;line-height:120%;text-align:center;mso-line-height-alt:24px">
                                                                        <p style="margin:0;word-break:break-word">
                                                                            <span>Don't worry, be happy!</span>
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <table class="paragraph_block block-6" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word">
                                                        <tbody>
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:5px;padding-left:10px;padding-right:10px;padding-top:5px">
                                                                    <div
                                                                        style="color:#3f4d75;font-family:Roboto Slab,Arial,Helvetica Neue,Helvetica,sans-serif;font-size:22px;line-height:120%;text-align:center;mso-line-height-alt:26.4px">
                                                                        <p style="margin:0;word-break:break-word">
                                                                            <span>Let's get you a new password.</span>
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <div class="spacer_block block-7"
                                                        style="height:20px;line-height:20px;font-size:1px"> </div>

                                                    <div style="display:flex;justify-content: center;">
                                                        <a href=${resetLink} target="_blank"
                                                            style="text-decoration:none;display:inline-block;color:#3f4d75;background-color:#ffffff;border-radius:10px;width:auto;border-top:2px solid #3F4D75;font-weight:undefined;border-right:2px solid #3F4D75;border-bottom:2px solid #3F4D75;border-left:2px solid #3F4D75;padding-top:10px;padding-bottom:10px;font-family:Roboto Slab, Arial, Helvetica Neue, Helvetica, sans-serif;font-size:18px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span
                                                                style="padding-left:25px;padding-right:25px;font-size:18px;display:inline-block;letter-spacing:normal;">
                                                                <span style="word-break:break-word;">
                                                                    <span style="line-height: 36px;" data-mce-style="">
                                                                        RESET MY
                                                                        PASSWORD</span></span></span>
                                                        </a>
                                                    </div>

                                                    <div class="spacer_block block-9"
                                                        style="height:20px;line-height:20px;font-size:1px"> </div>
                                                    <table class="paragraph_block block-10" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word">
                                                        <tbody>
                                                            <tr>
                                                                <td class="pad">
                                                                    <div
                                                                        style="color:#3f4d75;font-family:Roboto Slab,Arial,Helvetica Neue,Helvetica,sans-serif;font-size:14px;line-height:120%;text-align:center;mso-line-height-alt:16.8px">
                                                                        <p style="margin:0;word-break:break-word">
                                                                            <span>If you didn’t request to change your
                                                                                password, simply ignore this
                                                                                email.</span>
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <div class="spacer_block block-11"
                                                        style="height:30px;line-height:30px;font-size:1px"> </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                        role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#c4d6ec">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0"
                                        cellspacing="0" role="presentation"
                                        style="mso-table-lspace:0;mso-table-rspace:0;color:#000;width:650px;margin:0 auto"
                                        width="650">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%"
                                                    style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:20px;padding-top:20px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0">
                                                    <table class="paragraph_block block-1" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word">
                                                        <tbody>
                                                            <tr>
                                                                <td class="pad">
                                                                    <div
                                                                        style="color:#3f4d75;font-family:Roboto Slab,Arial,Helvetica Neue,Helvetica,sans-serif;font-size:12px;line-height:120%;text-align:center;mso-line-height-alt:14.399999999999999px">
                                                                        <p style="margin:0;word-break:break-word">
                                                                            <span>This link will&nbsp;expire in 10 minutes.&nbsp;If you continue to have
                                                                                problems</span><br>
                                                                            <span>please feel free to &nbsp;<a
                                                                                    href="mailto:dropshipping.scraper.service@gmail.com"
                                                                                    target="_blank"
                                                                                    title="dropshipping.scraper.service@gmail.com"
                                                                                    rel="noopener"
                                                                                    style="text-decoration: underline; color: #85a4cd;">Contact
                                                                                    Us</a>
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table><!-- End -->
</body>

</html>
        `
    );
};