"use client";

export default function MicrosoftFormEmbed() {
  return (
    <div className="p-[32px] space-y-[32px]">
      <div className="text-center">
        <span className="text-[60px] font-normal capitalize leading-[123.2px] text-secondary-main">
          Get in Touch
        </span>
        <p>
          Fill out the short form below to start connecting with top emerging
          tech talent through our Talent Portal.
        </p>
      </div>
      <div className="w-full h-[2400px]">
        <iframe
          className="w-full h-full border-none"
          src="https://forms.office.com/Pages/ResponsePage.aspx?id=V6LHo_JAqUOTc4u1_Ghi9wcy5CcJx2xKkF47WjFebglUMlJOVUs1NUJDMVdINzEzVTBDVEhBR1Y5Ti4u&route=shorturl"
          loading="lazy"
          allowFullScreen
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
}
