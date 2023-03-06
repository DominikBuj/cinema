FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine AS build
WORKDIR /App

COPY . ./
RUN dotnet restore
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:7.0-alpine
ENV ASPNETCORE_URLS=http://+:5000
WORKDIR /App
COPY --from=build /App/out .
ENTRYPOINT ["dotnet", "backend.dll"]