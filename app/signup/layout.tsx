import React from 'react';

const SignupLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header>Signup Header</header>
      <main>{children}</main>
      <footer>Signup Footer</footer>
    </div>
  );
};

export default SignupLayout;
