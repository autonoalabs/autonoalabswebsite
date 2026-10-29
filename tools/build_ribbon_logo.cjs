// Keep the original logo pixels. SVG performs only cropping and white-to-alpha masking.
const fs=require('node:fs');
const crypto=require('node:crypto');
const source='assets/brand/source-logo.png';
const target='assets/brand/autonoa-ribbon.svg';
const bytes=fs.readFileSync(source);
const svg=`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1078" height="604" viewBox="96 190 1078 604">
  <title>Autonoa Labs original AL ribbon</title>
  <desc>The original gold and black ribbon, isolated from the supplied full logo. Original image colours and geometry are retained.</desc>
  <defs>
    <filter id="whiteToAlpha" filterUnits="userSpaceOnUse" x="0" y="0" width="1254" height="1254" color-interpolation-filters="sRGB">
      <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 -1 0 1" result="whiteMask"/>
      <feComponentTransfer in="whiteMask" result="ribbonAlpha"><feFuncA type="linear" slope="32" intercept="-2.5"/></feComponentTransfer>
      <feComposite in="SourceGraphic" in2="ribbonAlpha" operator="in"/>
    </filter>
  </defs>
  <image x="0" y="0" width="1254" height="1254" filter="url(#whiteToAlpha)" xlink:href="data:image/png;base64,${bytes.toString('base64')}"/>
</svg>
`;
fs.writeFileSync(target,svg);
fs.writeFileSync('assets/brand/provenance.json',JSON.stringify({
  source:'source-logo.png',sourceOriginalName:'Autonoa Labs Gold Ribbon Logo.png',
  sha256:crypto.createHash('sha256').update(bytes).digest('hex'),
  output:'autonoa-ribbon.svg',viewBox:[96,190,1078,604],
  method:'Original PNG embedded unchanged; cropped to ribbon; a blue-channel white-background mask changes alpha only. Source RGB and ribbon geometry are not regenerated.',
  rebuild:'node tools/build_ribbon_logo.cjs'
},null,2)+'\n');
console.log('Built original-pixel ribbon SVG. Source SHA-256:',crypto.createHash('sha256').update(bytes).digest('hex'));
