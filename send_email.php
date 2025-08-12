<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $to = "syednabil.0413@gmail.com";
  $subject = "New Email from Contact Form";
  $message = $_POST["message"];
  $headers = "From: " . $_POST["email"];

  if (mail($to, $subject, $message, $headers)) {
    echo "Email sent successfully!";
  } else {
    echo "Failed to send email. Please try again.";
  }
}
?>