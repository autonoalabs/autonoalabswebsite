const {test}=require('node:test');
const assert=require('node:assert/strict');
const {prepare}=require('../assets/contact-draft.js');

test('draft preserves Unicode, ampersands and line breaks without changing the recipient',()=>{
  const message='Connect our CRM & website.\nKeep the customer follow-up clear.';
  const result=prepare({name:'Majid शेख',email:'hello@example.com',company:'Sales & Services',service:'martech',message});
  const url=new URL(result.href);
  assert.equal(url.protocol,'mailto:');
  assert.equal(url.pathname,'contact@autonoalabs.com');
  assert.equal(url.searchParams.get('subject'),'Website enquiry: MarTech services');
  assert.ok(url.searchParams.get('body').includes(message));
  assert.ok(url.searchParams.get('body').includes('Majid शेख'));
  assert.equal(url.searchParams.size,2);
});

test('an unknown service cannot inject email headers or a recipient',()=>{
  const result=prepare({service:'\r\nBcc: other@example.com',email:'customer@example.com',name:'Customer',message:'Please help us review one business workflow.'});
  const url=new URL(result.href);
  assert.equal(url.searchParams.get('subject'),'Website enquiry: Help choosing a starting point');
  assert.equal(url.searchParams.has('bcc'),false);
  assert.equal(url.pathname,'contact@autonoalabs.com');
});

test('draft handles optional company and bounds the message length',()=>{
  const result=prepare({name:' Customer ',email:'customer@example.com',company:'',service:'automation',message:'x'.repeat(2000)});
  assert.ok(result.body.includes('Name: Customer\n'));
  assert.ok(result.body.includes('Company: Not provided'));
  assert.ok(result.body.includes('x'.repeat(1500)));
  assert.ok(!result.body.includes('x'.repeat(1501)));
});
