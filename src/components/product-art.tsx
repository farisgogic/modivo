import type { Product } from '@/lib/catalog';
export function ProductArt({ kind, hero = false }: { kind: Product['visual']; hero?: boolean }) {
  return (
    <div className={`product-art art-${kind} ${hero ? 'hero-art' : ''}`} aria-hidden="true">
      {kind === 'planner' && (
        <div className="planner-sheet">
          <div className="sheet-top">
            <span>MODIVO / EVERYDAY SERIES</span>
            <span>01</span>
          </div>
          <div className="planner-title">
            A little
            <br />
            more space<span>↗</span>
          </div>
          <div className="planner-sub">A thoughtful place for everything.</div>
          <div className="planner-grid">
            <div>
              <small>TODAY’S INTENTION</small>
              <i />
              <i />
              <i />
            </div>
            <div>
              <small>ROOM FOR GOOD THINGS</small>
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="planner-bottom">
            <span>
              Less noise.
              <br />
              More possibility.
            </span>
            <b>Make room.</b>
          </div>
        </div>
      )}
      {kind === 'stationery' && (
        <div className="invitation-sheet">
          <div className="invitation-flower">✳</div>
          <small>GOOD PEOPLE. A BEAUTIFUL EVENING.</small>
          <div className="invitation-title">
            Let’s
            <br />
            <em>gather.</em>
          </div>
          <div className="invitation-rule" />
          <p>
            AT THE SAME TABLE,
            <br />
            UNDER THE SAME STARS.
          </p>
          <span className="invitation-foot">AN INVITATION TO SOMETHING GOOD</span>
        </div>
      )}
      {kind === 'creative' && (
        <div className="creative-sheet">
          <div className="sheet-top">
            <span>A NEW WAY OF SEEING</span>
            <span>↗</span>
          </div>
          <div className="creative-title">
            Fresh
            <br />
            <em>perspec</em>
            <br />
            tives.
          </div>
          <div className="creative-orbit">
            <span />
          </div>
          <div className="creative-foot">
            MAKE SOMETHING
            <br />
            WORTH LOOKING AT. <span>MODIVO</span>
          </div>
        </div>
      )}
    </div>
  );
}
