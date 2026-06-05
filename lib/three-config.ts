// Brand-token-mirrored 3D scene constants.
// Centralizes the color and unit references for the R3F scene.

export const THREE_INK_0 = "#0A0A0B";
export const THREE_INK_1 = "#101013";
export const THREE_INK_2 = "#161619";
export const THREE_INK_3 = "#1F1F24";
export const THREE_VOLT = "#D7FF1E";
export const THREE_VOLT_DIM = "#7A9010";

export const SCENE_FOG = THREE_INK_0;
export const SCENE_BG = THREE_INK_0;

export type SceneColor = {
  ink0: string;
  ink1: string;
  ink2: string;
  volt: string;
};

export const sceneColors: SceneColor = {
  ink0: THREE_INK_0,
  ink1: THREE_INK_1,
  ink2: THREE_INK_2,
  volt: THREE_VOLT,
};
