'use client';
import { useRef, useState } from 'react';
import { BrandMark } from './brand-mark';
import { ProductArt } from './product-art';
export function HeroObject() {
  const [selected, setSelected] = useState('planner');
  const editions = [
    { id: 'planner', label: 'Make space', number: '01' },
    { id: 'stationery', label: 'Bring together', number: '02' },
    { id: 'creative', label: 'Think different', number: '03' },
  ];
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      className={`hero-object selected-${selected}`}
      ref={ref}
      onPointerMove={(event) => {
        if (
          event.pointerType !== 'mouse' ||
          window.matchMedia('(prefers-reduced-motion: reduce)').matches
        )
          return;
        const bounds = event.currentTarget.getBoundingClientRect();
        ref.current?.style.setProperty(
          '--tilt-x',
          `${(event.clientY - bounds.top - bounds.height / 2) / -65}deg`,
        );
        ref.current?.style.setProperty(
          '--tilt-y',
          `${(event.clientX - bounds.left - bounds.width / 2) / 65}deg`,
        );
      }}
      onPointerLeave={() => {
        ref.current?.style.setProperty('--tilt-x', '0deg');
        ref.current?.style.setProperty('--tilt-y', '0deg');
      }}
    >
      <div className="object-annotation">
        <span>THE MODIVO EDIT</span>
        <span>VOL. 001 / CONCEPTS</span>
      </div>
      <div className="object-orbit" aria-hidden="true" />
      <div className="sheet-stack">
        <div className="stack-back">
          <ProductArt kind="creative" hero />
        </div>
        <div className="stack-middle">
          <ProductArt kind="stationery" hero />
        </div>
        <div className="stack-front">
          <ProductArt kind="planner" hero />
        </div>
      </div>
      <div className="object-seal">
        <BrandMark />
        <span>
          GOOD IDEAS,
          <br />
          TAKING SHAPE.
        </span>
      </div>
      <div className="object-controls" role="group" aria-label="Explore concept compositions">
        {editions.map((edition) => (
          <button
            key={edition.id}
            type="button"
            aria-pressed={selected === edition.id}
            onClick={() => setSelected(edition.id)}
          >
            <span aria-hidden="true">{edition.number}</span>
            {edition.label}
          </button>
        ))}
      </div>
      <div className="object-caption">
        <span>DESIGNED TO BE YOUR STARTING POINT.</span>
        <span>CONCEPT PREVIEWS</span>
      </div>
    </div>
  );
}
