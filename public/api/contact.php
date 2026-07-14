<?php
mb_language('Japanese');
mb_internal_encoding('UTF-8');

$logFile = __DIR__ . '/contact_log.txt';
function writeLog($msg) {
    global $logFile;
    file_put_contents($logFile, date('[Y-m-d H:i:s] ') . $msg . "\n", FILE_APPEND);
}

define('MAIL_TO', ['info@lala-reform.com', 'kurihara@lala-reform.com']);
define('MAIL_SUBJECT_PREFIX', '【LALA】お問い合わせ：');
define('ALLOWED_ORIGIN', 'https://lala-reform.com');

header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGIN);
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['status' => 'error', 'message' => 'Method not allowed']); exit; }

$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (strpos($contentType, 'application/json') !== false) {
    $input = json_decode(file_get_contents('php://input'), true) ?? [];
} else {
    $input = $_POST;
}

function clean(string $val): string { return htmlspecialchars(trim($val), ENT_QUOTES, 'UTF-8'); }

$name        = clean($input['name']         ?? '');
$phone       = clean($input['phone']        ?? '');
$email       = clean($input['email']        ?? '');
$location    = clean($input['location']     ?? '');
$service     = clean($input['service']      ?? '');
$contactMethod = clean($input['contactMethod'] ?? '');
$message     = clean($input['message']      ?? '');

writeLog("受信データ: name={$name} email={$email} phone={$phone}");

$errors = [];
if (empty($name))        $errors[] = 'お名前が未入力です';
if (empty($phone) && empty($email)) $errors[] = '電話番号またはメールアドレスのいずれかが必要です';
if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'メールアドレスの形式が正しくありません';
if (empty($message))     $errors[] = 'お問い合わせ内容が未入力です';

if (!empty($errors)) { http_response_code(400); echo json_encode(['status' => 'error', 'message' => implode(', ', $errors)]); exit; }

$subject = MAIL_SUBJECT_PREFIX . ($service ?: 'ご相談');
$body = "LALA お問い合わせフォームより\n\n■ お名前\n{$name}\n\n■ 電話番号\n{$phone}\n\n■ メールアドレス\n{$email}\n\n■ 施工予定地\n{$location}\n\n■ 希望する工事内容\n{$service}\n\n■ 希望連絡方法\n{$contactMethod}\n\n■ お問い合わせ内容\n{$message}\n\n─────────────────────────────\nこのメールはWebサイトのお問い合わせフォームから自動送信されました。";

$headers  = "From: info@lala-reform.com\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "Content-Transfer-Encoding: base64\r\n";

$encodedSubject = mb_encode_mimeheader($subject, 'UTF-8', 'B');
$encodedBody    = base64_encode($body);

writeLog("送信開始 TO:" . implode(',', MAIL_TO));
$allSent = true;
foreach (MAIL_TO as $recipient) {
    $sent = mail($recipient, $encodedSubject, $encodedBody, $headers);
    writeLog("mail()結果 TO:{$recipient} - " . ($sent ? "成功" : "失敗"));
    $allSent = $allSent && $sent;
}

if ($allSent && !empty($email)) {
    $replySubject = '【LALA】お問い合わせありがとうございます';
    $replyBody = "{$name} 様\n\nこのたびは、LALAへお問い合わせいただき、誠にありがとうございます。\nお問い合わせを受け付けいたしました。内容を確認のうえ、担当者よりあらためてご連絡いたします。\n\n通常、2〜3営業日以内を目安にご返信しておりますが、お問い合わせ内容によりお時間をいただく場合がございます。\nあらかじめご了承ください。\nなお、このメールは自動送信です。\n\n──────────────────────────────────────────────────\n■ お問い合わせ内容\n\nお名前　　　　　：{$name}\n電話番号　　　　：{$phone}\nメールアドレス　：{$email}\n施工予定地　　　：{$location}\n希望する工事内容：{$service}\n希望連絡方法　　：{$contactMethod}\n\nお問い合わせ内容：\n{$message}\n──────────────────────────────────────────────────\n\nLALA\nhttps://lala-reform.com";

    $replyHeaders  = "From: LALA <info@lala-reform.com>\r\n";
    $replyHeaders .= "MIME-Version: 1.0\r\n";
    $replyHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $replyHeaders .= "Content-Transfer-Encoding: base64\r\n";

    $encodedReplySubject = mb_encode_mimeheader($replySubject, 'UTF-8', 'B');
    $encodedReplyBody    = base64_encode($replyBody);

    $replySent = mail($email, $encodedReplySubject, $encodedReplyBody, $replyHeaders);
    writeLog("自動返信結果: " . ($replySent ? "成功" : "失敗"));

    http_response_code(200);
    echo json_encode(['status' => 'success']);
} else if ($allSent) {
    http_response_code(200);
    echo json_encode(['status' => 'success']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'メール送信に失敗しました']);
}
?>
