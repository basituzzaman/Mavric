param(
  [Parameter(Mandatory = $true)]
  [string]$Message
)

& "C:\Program Files\Git\bin\git.exe" add -A
& "C:\Program Files\Git\bin\git.exe" commit -m $Message
& "C:\Program Files\Git\bin\git.exe" push -u origin main
