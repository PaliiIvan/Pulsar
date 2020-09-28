$main_location = Get-Location

$angular = "$main_location\pulsar.client.angular"
$nodeJs = "$main_location\pulsar.server.node-js"
$identityNodeJs = "$main_location\pulsar.identity-server.node-js"
$streamServerMet = "$main_location\pulsar.stream-core.net\web"
Write-Host "Starting..."

Start-Process PowerShell -ArgumentList "Write-Host 'Start Node Js Server'; npm run-script watch --prefix '$nodeJs'; Read-Host"
Start-Process PowerShell -ArgumentList "Write-Host 'Start Node Js Identity Server'; npm run-script watch --prefix '$identityNodeJs'; Read-Host"
Start-Process PowerShell -ArgumentList "Write-Host 'Start Angular'; npm start --prefix '$angular'; Read-Host"
Start-Process PowerShell -ArgumentList "Write-Host 'Start Stream DotNet'; dotnet watch run --project '$streamServerMet'; Read-Host"

Write-Host "All services was started"