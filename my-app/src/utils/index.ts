export function formatDateToISO(date: Date): string {
    return date.toISOString().split('T')[0];
}

export function getNotebookStatus(total: number, prePayment: number) {
  if (total === 0 && prePayment === 0) {
    return { label: "still", color: "light" };
  }

  if (prePayment >= total) {
    return { label: "paid", color: "success" };
  }

  return { label: "not paid", color: "warning" };
}
