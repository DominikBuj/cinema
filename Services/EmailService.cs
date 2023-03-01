namespace kino.Services;

using kino.Models;
using MailKit.Net.Smtp;
using MimeKit;

public interface IEmailService
{
    void SendEmail(EmailMessage emailMessage);
}

public class EmailService : IEmailService
{
    private readonly EmailConfiguration _emailConfiguration;

    public EmailService(EmailConfiguration emailConfiguration)
    {
        _emailConfiguration = emailConfiguration;
    }

    public void SendEmail(EmailMessage emailMessage)
    {
        MimeMessage _emailMessage = CreateEmailMessage(emailMessage);
        Send(_emailMessage);
    }

    private MimeMessage CreateEmailMessage(EmailMessage emailMessage)
    {
        MimeMessage _emailMessage = new MimeMessage();
        _emailMessage.From.Add(new MailboxAddress("Email", _emailConfiguration.From));
        _emailMessage.To.AddRange(emailMessage.To);
        _emailMessage.Subject = emailMessage.Subject;
        _emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Text) { Text = emailMessage.Content };
        return _emailMessage;
    }

    private void Send(MimeMessage emailMessage)
    {
        using (SmtpClient client = new SmtpClient())
        {
            try
            {
                client.Connect(_emailConfiguration.SmtpServer, _emailConfiguration.Port, true);
                client.AuthenticationMechanisms.Remove("XOAUTH2");
                client.Authenticate(_emailConfiguration.UserName, _emailConfiguration.Password);
                client.Send(emailMessage);
            }
            catch
            {
                throw;
            }
            finally
            {
                client.Disconnect(true);
                client.Dispose();
            }
        }
    }
}