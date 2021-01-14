$OFS = "`n"
echo $args.count
if($args.count -eq 2)
{
	$subject = $args[0]
	$message = $args[1]
	$to = "AGhaddar@path-solutions.com;HKhoury@path-solutions.com;SMoussa@path-solutions.com;RAyek@path-solutions.com"
	$cc = "ashreif@path-solutions.com;gandary@path-solutions.com;EEzzat@path-solutions.com"
	.".\email.ps1" $subject $message $to $cc

}else{
	echo 'wrong data'
}
