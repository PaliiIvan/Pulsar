$main_location = Get-Location

$angular = "$main_location\pulsar.client.angular"
$nodeJs = "$main_location\pulsar.client-server.node-js"
$dotNet = "$main_location\pulsar.stream-server.net\web"

Write-Host "Starting..."

Start-Process PowerShell -ArgumentList "Write-Host 'Start Node Js Server'; npm run start:dev --prefix '$nodeJs'; Read-Host"
Start-Process PowerShell -ArgumentList "Write-Host 'Start Angular'; npm start --prefix '$angular'; Read-Host"
Start-Process PowerShell -ArgumentList "Write-Host 'Start Dotnet Core'; dotnet watch -p '$dotNet' run; Read-Host"

Write-Host "All services was started"