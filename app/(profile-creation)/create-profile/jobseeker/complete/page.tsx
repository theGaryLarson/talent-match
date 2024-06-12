import React from 'react';

export default function CreateJobseekerProfileCompletePage(){
    return(
        <main>
          <h1>Create account</h1>
          <form>
            <fieldset>
              <legend>Select your role first</legend>
              <label>An employer <input type="radio" name="account-role"/></label>
              <label>A job seeker <input type="radio" name="account-role"/></label>
            </fieldset>
            <input type="submit" value="Continue"/>
          </form>
          <p>or</p>
          <div>
            <p>Already have a CFA account?</p>
          </div>
        </main>
    );
}