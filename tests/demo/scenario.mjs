export default async function pixelPartyScenario(a, b) {
  await a.getByRole("button", { name: /Cell 1, 1/ }).click();
  await b.getByRole("button", { name: /Cell 1, 1, #f97316/ }).waitFor({ timeout: 10_000 });
  await b.getByRole("button", { name: /Cell 2, 1/ }).click();
  await a.getByRole("button", { name: /Cell 2, 1, #f97316/ }).waitFor({ timeout: 10_000 });
  await a.waitForTimeout(1_000);
}
