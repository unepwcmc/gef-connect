# GEF Connect (01704)

## Notes

### Intro

GEF = Global Environment Facility

Simple brochure website built on Comfortable Mexian Sofa. It has a news section with live filtering and pagination. Social sharing is present on every article page.

### Team

- Client - Nadine Bowles-Newark (EAP)
- Product Management - Roger Ingle
- UX/Design - Michel Doudin
- Developers - [@stacywcmc](http://github.com/stacywcmc) [@spencerldixon](http://github.com/spencerldixon)

### Tech

- Foundation 6 (Using Flexbox grid)
- Comfy Mexican Sofa
- Ruby 2.3.4
- Rails 4.2.5.2
- Postgresl 9.6

## Browser support

- Most used in Africa (2017) - Chrome and Oracle

- Lastest Chrome, Firefox, Safari, Oracle
- IE 11+
- iOS..?
- Android..?

## Local development

You will need ImageMagick installed, if you're using OSX you can do this through homebrew `brew install imageMagick`

```
git clone https://github.com/unepwcmc/gef-connect
cd gef-connect
bundle install
npm install
rails db:create && db:migrate
```

## Hosted sites

###Staging

<http://gef-connect.web-staging.linode.unep-wcmc.org/>