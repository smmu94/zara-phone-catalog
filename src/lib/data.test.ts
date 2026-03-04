import { getPhones } from "./data";
import { mockPhones } from "./testMocks";

describe("getPhones", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call fetch to retrieve phones", async () => {
    const twoPhones = mockPhones.slice(0, 2);
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => twoPhones,
    });

    const result = await getPhones();

    expect(result).toEqual(twoPhones);
    expect(global.fetch).toHaveBeenCalled();
  });

  it("should throw error when API returns not ok status", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    await expect(getPhones()).rejects.toThrow();
  });

  it("should return array of phones", async () => {
    const twoPhones = mockPhones.slice(0, 2);
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => twoPhones,
    });

    const result = await getPhones();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
  });
});
