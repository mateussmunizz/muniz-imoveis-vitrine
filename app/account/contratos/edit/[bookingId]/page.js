import SubmitButton from "@/app/_components/SubmitButton";
import { updateContrato } from "@/app/_lib/actions";
import { getContrato, getImovel } from "@/app/_lib/data-service";

export default async function Page({ params }) {
  const { contratoId } = params;
  const { numclientes, observations, imovelId } = await getContrato(contratoId);
  const { maxCapacity } = await getImovel(imovelId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{contratoId}
      </h2>

      <form
        action={updateContrato}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <input type="hidden" value={contratoId} name="contratoId" />

        <div className="space-y-2">
          <label htmlFor="numclientes">How many clientes?</label>
          <select
            name="numclientes"
            id="numclientes"
            defaultValue={numclientes}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of clientes...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "cliente" : "clientes"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            defaultValue={observations}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitButton pendingLabel="Updating...">
            Update reservation
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
