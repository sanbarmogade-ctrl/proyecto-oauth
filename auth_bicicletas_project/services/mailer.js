module.exports = async function sendMail({ to, subject, html }) {
  console.log('=== EMAIL ENVIADO ===');
  console.log('TO:', to);
  console.log('SUBJECT:', subject);
  console.log('BODY:', html);
  console.log('=====================');
  return { accepted: [to], messageId: 'demo-message-id' };
};
