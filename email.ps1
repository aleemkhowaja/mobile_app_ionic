$OFS = "<br><br>"


if($args.count -gt 2)
{
	$subject = $args[0]
	$body = $args[1]
	$to = $args[2]
	$cc = $args[3]
	
	
	$sigPath = 'C:\Users\gilbertandary\AppData\Roaming\Microsoft\Signatures\MySignature.htm'
	$html = New-Object -ComObject "HTMLFile";
	$signature = Get-Content -Path $sigPath -Raw;
	#$signature = $signature -replace "img", ''
	
	$body = $body -replace "\\n", $OFS
	$body = '<div style="color:#2e74b5;font-size:11pt;font-family: Comic Sans MS, Comic Sans, cursive;">' + $body + '</div>' + $signature
	
	
	#create COM object named Outlook 
	$Outlook = New-Object -ComObject Outlook.Application 
	#create Outlook MailItem named Mail using CreateItem() method 
	$Mail = $Outlook.CreateItem(0)
	#add properties as desired 
	$Mail.To = $to
	#$Mail.To = "gandary@path-solutions.com" 
	$Mail.Cc = $cc
	$Mail.Subject = $subject
	$Mail.HTMLBody  = $body
	#send message 
	$Mail.Send() 
	[System.Runtime.Interopservices.Marshal]::ReleaseComObject($Outlook) | Out-Null
}else{
	echo "Missing Data"
}

