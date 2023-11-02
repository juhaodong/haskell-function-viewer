<?php
function ends_with($haystack, $needle): bool
{
    $length = strlen($needle);
    if (!$length) {
        return true;
    }
    return substr($haystack, -$length) === $needle;
}

$url = $_REQUEST['url'];
if (!function_exists('cors')) {
    function cors()
    {
        // Allow from any origin
        if (isset($_SERVER['HTTP_ORIGIN'])) {
            // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
            // you want to allow, and if so:
            header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Max-Age: 86400');    // cache for 1 day
        }
        // Access-Control headers are received during OPTIONS requests
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
                header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
                header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        }
    }
}
cors();
$content = file_get_contents('php://input');
$curl = curl_init($url);
$accept_html = ends_with($url, 'html');
curl_setopt($curl, CURLOPT_HEADER, false);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_ENCODING, '');
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl, CURLINFO_HEADER_OUT, true);
curl_setopt($curl, CURLOPT_HTTPHEADER,
    array("Content-type: application/json",
        "Authorization: X-ApiKey 7722a5ce8ec06f53bbfddd7204707300baf54cc8f3763f2b6ede48e7d45eef8c",
        $accept_html ? 'Accept: text/html' : "Accept: application/json"
    ));
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $content);
}

$json_response = curl_exec($curl);
$headers = curl_getinfo($curl, CURLINFO_HEADER_OUT);
$httpCode = curl_getinfo($curl , CURLINFO_HTTP_CODE);
$response = curl_error($curl);

curl_close($curl);

echo $json_response;
