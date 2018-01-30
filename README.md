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

- Google fonts
- Foundation 6 (Using 12 column grid)
- Vuejs 2.0
- Comfy Mexican Sofa
- Ruby 2.3.4
- Rails 4.2.5.2
- Postgresl 9.6

## Browser support

- Most used in Africa (2017) - Chrome and Opera

- Lastest Chrome, Firefox, Safari, Opera
- IE 11+

N.B Do not use CSS3 transforms, they are not supported in Opera Mini (02/05/2017) <http://caniuse.com/#search=transforms>

## Front end

### Styling

- Custom styles have been set for ol and ul tags, wrap any rich text content pulled from the CMS with the class `custom-lists`.

## Local development

You will need ImageMagick installed, if you're using OSX you can do this through homebrew `brew install imageMagick`

```
git clone https://github.com/unepwcmc/gef-connect
cd gef-connect
bundle install
npm install
rails db:create && db:migrate
```