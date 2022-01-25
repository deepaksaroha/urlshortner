# urlshortner
## A utility tools application.
This application takes a url from user as input and returns a smaller url. It also displays all the previously converted urls.

## UI
<img src="/images/us-ss1.jpg" />

## Built With
<li>html5</li>
<li>css</li>
<li>Node.js</li>
<li>express ^4.17.1</li>
<li>shortid ^2.2.16</li>
<li>Heroku</li>

## API Endpoints
```
POST https://url-shortner-exp.herokuapp.com/url
Sample Request Body:
{
	"longUrl":"https://eportal.incometax.gov.in/iec/foservices/#/pre-login/itrStatus"
}

Sample Response Body :
{
  "id": "8_jdELCCS"
  "shortUrl": "https://url-shortner-exp.herokuapp.com/u/8_jdELCCS"
}
```

```
GET https://url-shortner-exp.herokuapp.com/api/urls/shortUrlID

If shortUrlID is valid Corresponding actual URL will be opened.

Status : 404 (URL does not exist)
```
