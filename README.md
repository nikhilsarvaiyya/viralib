### Install Package
```javascript
npm install viralib
```
### Import package
```javascript
import { VRAButton } from 'viralib';
```
### Default Button 
```javascript
<VRAButton />
```
### Icon Button
```javascript
<VRAButton color="red" iconStart={<Delete />} />
```
### Icon With Label
```javascript
<VRAButton color="red" label="OK" iconEnd={<Delete />} />
```
### Usages
## Type
> button | submit
```javascript
<VRAButton type="button" />
```
## as
> link | outline | solid
```javascript
<VRAButton as="solid" />
```
## color
> red | pink | purple | indigo | blue | teal | green | yellow | orange | brown | gray | white | black
```javascript
<VRAButton color="blue" />
```
## Disabled
> true | false
```javascript
<VRAButton disabled={true} />
```
## size
> xxs | xs | x(default) | xl | xxl
```javascript
<VRAButton size="xs" />
```
## style
> Add style as per css guidelines
```javascript
<VRAButton style={{}} />
```
## View
<picture>
  <img alt="Button" src="https://github.com/nikhilsarvaiyya/viralib/blob/main/src/assets/img/button.png">
</picture>

