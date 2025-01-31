"use client";

import { Modal } from "@mui/material";
import React from "react";
import PillButton from "./PillButton";
import Link from "next/link";
import Image from "next/image";
import { EventTypeEnum } from "@/app/lib/events";

export type EventData = {
  id: string;
  name: string | null;
  description: string | null;
  location: string | null;
  date: Date;
  registrationLink: string | null;
  duration: number;
  joinMeetingLink: string | null;
  blurb: string | null;
  eventType: EventTypeEnum;
  createdById: string | null;
};

interface EventProps {
  event: EventData;
  registered: boolean;
  showLink: boolean;
}

export default function Event({ event, registered, showLink }: EventProps) {
  const [reg, setReg] = React.useState(registered);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function register() {
    const response = await fetch("/api/events/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eventId: event.id }),
    });
    if (response.ok) {
      if (event.registrationLink) {
        window.open(event.registrationLink!, "_blank");
      }
      setReg(true);
    }
  }

  function EventModal() {
    return (
      <div className="w-3/4 tablet:w-1/2 absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] p-6 bg-white rounded-lg flex-col justify-start items-start inline-flex overflow-hidden">
        {/* Top */}
        <div className="self-stretch bg-white flex-col justify-start items-center flex">
          <div className="self-stretch flex-col justify-start items-start flex">
            <div className="self-stretch py-4 flex-col justify-start items-start flex">
              <div className="w-full block tablet:hidden flex justify-end items-end">
                <PillButton variant="outlined" onClick={handleClose}>
                  Close
                </PillButton>
              </div>
              <div className="self-stretch justify-start items-start inline-flex">
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                  <div className="self-stretch text-black/90 text-4xl font-normal leading-10 tracking-tight">
                    {event.name}
                  </div>
                  <div className="w-full justify-start items-start gap-2 flex flex-col">
                    <div className="flex-row gap-2 justify-start items-start gap-2 inline-flex">
                      <Image
                        src="/images/events/calendar.svg"
                        width={20}
                        height={20}
                        alt="Calendar icon"
                      />
                      <div className="text-black/90 text-base font-normal leading-normal tracking-tight">
                        {event.date.toDateString()}{" "}
                        {event.date.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        }) +
                          " - " +
                          endTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                      </div>
                    </div>
                    <div className="flex flex-row gap-2 justify-start items-start inline-flex">
                      <Image
                        src="/images/events/location-pin.svg"
                        width={20}
                        height={20}
                        alt="Pin icon"
                      />
                      <div className="text-black/90 text-base font-normal leading-normal tracking-tight">
                        {event.location}
                      </div>
                    </div>
                  </div>
                </div>
                <div />
                <div className="hidden tablet:block">
                  <PillButton variant="outlined" onClick={handleClose}>
                    Close
                  </PillButton>
                </div>
                <div className="h-2 flex-col justify-start items-start inline-flex">
                  <div className="w-4 h-2 relative">
                    <div className="w-4 h-2 left-0 top-0 absolute" />
                  </div>
                </div>
                <div className="hidden tablet:block">
                  {reg ? (
                    <PillButton disabled>Registered</PillButton>
                  ) : (
                    <PillButton onClick={register}>Register</PillButton>
                  )}
                </div>
              </div>
              <div className="block tablet:hidden">
                {reg ? (
                  <PillButton disabled>Registered</PillButton>
                ) : (
                  <PillButton onClick={register}>Register</PillButton>
                )}
              </div>
            </div>
            <div className="self-stretch h-px flex-col justify-start items-start flex">
              <div className="w-px h-px relative" />
              <div className="self-stretch h-px border border-black/10"></div>
            </div>
          </div>
        </div>
        {/* Bottom */}
        <div className="self-stretch h-96 pt-6 flex-col justify-start items-start flex">
          <div className="self-stretch justify-start items-start gap-6 inline-flex">
            <div className="grow shrink basis-0 text-zinc-900 text-base font-normal leading-normal tracking-tight">
              {event.description}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const endTime = new Date(event.date.getTime() + event.duration * 60000);

  return (
    <div className="w-full rounded-md p-4 hover:bg-slate-200 grid grid-cols-4 justify-start items-center mb-4">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EventModal></EventModal>
      </Modal>
      {/* Event info in table row */}
      <div
        onClick={handleOpen}
        className="self-stretch justify-start items-center flex"
      >
        <div className="grow shrink basis-0 self-stretch justify-start items-center flex">
          <div className="grow shrink basis-0 text-sky-900 text-base font-medium leading-normal tracking-tight">
            {event.name}
          </div>
        </div>
      </div>
      <div
        onClick={handleOpen}
        className="self-stretch justify-start items-center flex"
      >
        <div className="grow shrink basis-0 text-sky-900 text-base font-</div>normal leading-normal tracking-tight">
          {event.date.toDateString()}
        </div>
      </div>
      <div
        onClick={handleOpen}
        className="self-stretch justify-start items-center flex"
      >
        <div className="grow shrink basis-0 text-zinc-900/60 text-base font-normal leading-normal tracking-tight">
          {event.date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }) +
            " - " +
            endTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
        </div>
      </div>
      <div
        onClick={handleOpen}
        className="flex-col justify-start items-start inline-flex"
      >
        {showLink && event.joinMeetingLink && (
          <div className="text-sky-600 underline text-base font-normal leading-normal tracking-tight">
            <Link href={event.joinMeetingLink!} target="_blank">
              Meeting Link
            </Link>
          </div>
        )}
        {showLink && event.registrationLink && (
          <div className="text-base font-normal leading-normal tracking-tight">
            Check email for Meeting Link
          </div>
        )}
        {!showLink && (
          <div className="flex-col justify-start items-start flex">
            {reg ? (
              "Registered"
            ) : (
              <PillButton onClick={handleOpen}>Register</PillButton>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
