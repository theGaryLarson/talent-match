import DividerWithText from '@/app/ui/components/DividerWithText';
import InputTextWithLabel from '@/app/ui/components/InputTextWithLabel';
import Link from 'next/link';
import {Button} from '@/app/ui/button';

export default function JobseekerSignupPage(){
    return(
      <main>
        <h1>Create a CFA account</h1>
        <p>Create a free CFA account to access job guides, 1:1 webinars, jobs &amp; opportunities.</p>
        <DividerWithText>or</DividerWithText>
        <form>
          <div className="flex">
            <InputTextWithLabel id="form-signup-first-name">First Name *</InputTextWithLabel>
            <InputTextWithLabel id="form-signup-last-name">Last Name *</InputTextWithLabel>
          </div>
          <InputTextWithLabel type="email" id="form-signup-email">Email *</InputTextWithLabel>
          <InputTextWithLabel type="password" id="form-signup-password">Password *</InputTextWithLabel>
          <InputTextWithLabel type="password" id="form-signup-password">Confirm Password *</InputTextWithLabel>
          <InputTextWithLabel id="form-signup-password">Country/Region of Residence *</InputTextWithLabel>
          <fieldset>
            <legend>What best describes you currently?</legend>
            <div>
              <label><input type="radio" value="a"/> Label</label>
            </div>
            <div>
              <label><input type="radio" value="b"/> Label</label>
            </div>
            <div>
              <label><input type="radio" value="c"/> Label</label>
            </div>
          </fieldset>
          <fieldset>
            <legend>Notification</legend>
            <div>
              <label><input type="checkbox" value="a" checked/> Receive new job posting notifications</label>
            </div>
            <div>
              <label><input type="checkbox" value="b"/> Hear more about career opportunities</label>
            </div>
            <div>
              <label><input type="checkbox" value="c"/> By signing up you agree to our <Link href="/">terms of use</Link>, and acknowledge you have read the <Link href="/">privacy notice</Link> and <Link href="/">data sharing agreement</Link>.</label>
            </div>
          </fieldset>
          <Button type="submit">Create account</Button>
        </form>
        <DividerWithText>or</DividerWithText>
        <div>
          <p>Already have a CFA account?</p>
          <Link href="/login">Login</Link>
        </div>
      </main>
    );
}