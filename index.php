<?php
/***
**  gets random word from randomword.net and the dictionary entry from merrriam-webster.com
**  and returns a json object for my stupid game RSTLNE
***/
//header('content-type application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");


$html = file_get_contents('http://randomword.net');
$re = "/\\?word=([^\"]*)/"; 
preg_match($re, $html, $word);
$url = 'http://www.merriam-webster.com/dictionary/' . $word[1];
$html  = file_get_contents($url);
$he = "/<strong>:<\\/strong>([^<]{4,})/si"; 
preg_match_all($he, $html, $hints);
$hintarray = array();
foreach($hints[0] as $v){
	$x = str_replace(chr(194).chr(160), '',  trim(str_replace("<strong>:</strong>","",$v)));
	if(strlen($x) > 0 && !(strpos($x,$word[1]))){
		array_push($hintarray, $x);
	}
}
$output = array('word'=>$word[1], 'hints'=>$hintarray);

echo json_encode($output);
?>