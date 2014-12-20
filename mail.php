<?php
/*
if( ! isset($_SERVER['HTTP_REFERER'] ) || $_SERVER['HTTP_REFERER'] != "http://julien.lerch.free.fr") {
	$headers   = array();
	$headers[] = "MIME-Version: 1.0";
	$headers[] = "Content-type: text/plain; charset=iso-8859-1";
	$headers[] = "From: Erreur Envoi CV <julien.lerch@free.fr>";
	$headers[] = "X-Mailer: PHP/5.2.3";
	// FIXME : mails and log file don't work...
	error_log("[500] : envoi depuis une autre origine", 1, "julienlerch@gmail.com", implode("\r\n", $headers));
	error_log("[500] : envoi depuis une autre origine", 1, "julienlerch@hotmail.com", $_SERVER['DOCUMENT_ROOT'] . "/logs/mail_errors.log");
	send_error ("erreur");
}
*/
$errors = array();

if(isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message'])) {
	if(empty($_POST['name'])) {
		$errors[] = "Le champ Nom est obligatoire";
	}
	if(empty($_POST['email'])) {
		$errors[] = "Le champ Email est obligatoire";
	}
	if(empty($_POST['message'])) {
		$errors[] = "Le champ Message est obligatoire";
	}

	if (count($errors) > 0) {
		send_error ("Veuillez remplir les champs obligatoires");
	}
	else {
		$to = 'julienlerch@gmail.com';
		$subject = "Message posté depuis le CV";

		$headers   = array();
		$headers[] = "MIME-Version: 1.0";
		$headers[] = "Content-type: text/plain; charset=iso-8859-1";
		$headers[] = "From: ".$_POST['name'] . " <".$_POST['email'].">";
		$headers[] = "Reply-To: ".$_POST['name'] . " <".$_POST['email'].">";
		$headers[] = "X-Mailer: PHP/5.2.3";
		$message = "Message posté depuis http://julien.lerch.free.fr : \n\n".$_POST['message'];

		// par sécurité on écrit un fichier
		$file = 'mails.txt';
		// The new person to add to the file
		$txt .= implode("\r\n", $headers);
		$txt .= "\r\n \r\n" . stripslashes($message) . "\r\n \r\n___________________________________________________________\r\n";
		file_put_contents($file, $txt, FILE_APPEND | LOCK_EX);

		$sent = mail($to, $subject, stripslashes($message), implode("\r\n", $headers));

		if ($sent === true) {
			echo "Votre message a bien été envoyé";
		} else {
			send_error("Votre message n'a pas été envoyé en raison d'une erreur serveur.");
		}
	}
} else {
	send_error("Veuillez renseigner les champs 'Email', 'Nom' et 'Message'");
}

function send_error ($str) {
	header('HTTP/1.1 500 Internal Server Error');
	echo $str;
	die();
}
?>
