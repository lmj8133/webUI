
//******************************************************************
//
//    Copyright (C) 2015.  Algoltek Corp. All rights reserved.
//    Algoltek Corporation, No.33-1, Sec2, Jiafeng 11th Rd.,
//    Zhubei City., Hsinchu County 30274, Taiwan (R.O.C.)
//
//================================================================
//
// MODULE:      Config.h
//
//******************************************************************

#ifndef _CONFIG_H_
#define _CONFIG_H_

// ====== Board Number  ======
#define BOARD0                              0
#define BOARD1                              1
#define BOARD2                              2
#define BOARD3                              3
#define BOARD4                              4   // 88 pin demo board(AG9421)
#define BOARD5                              5   // 48 pin EVB(AG9410)
#define BOARD6                              6
#define BOARD7                              7   // PX(AG9411)
#define BOARD8                              8   // Fullink, 88 pin
#define BOARD9                              9   // Kingtron, 88 pin
#define BOARD10                             10  // FPGA
#define BOARD11                             11  // 64 pin demo board with single type-c port(AG9410, 4 Lane)
#define BOARD12                             12  // 64 pin demo board with dual type-c port(AG9411)
#define BOARD13                             13  // C-Smartlink, 88 pin
#define BOARD14                             14  // 56 pin demo board(AG9410)
#define BOARD15                             15  // AG9411P, 4 lane
#define BOARD16                             16  // AG9411, 4 lane, 2Layer
#define BOARD21                             21
#define BOARD22                             22  // 64 pin demo board with single type-c port(AG9410, 2 Lane)
#define BOARD30                             30  // FAE reference circuit for PCB with cable plug, 2 lane(AG9411)
#define BOARD31                             31  // FAE reference circuit for PCB with cable plug, 2 lane(AG9411)
#define BOARD32                             32  // FAE reference circuit with dual type-c receptacle, 2 lane(AG9411)
#define BOARD41                             41  // FAE reference Dh
#define BOARD43                             43  // FAE reference Dx
#define BOARD51                             51
#define BOARD52                             52
#define BOARD53                             53  // 128 pin EVB
#define BOARD54                             54  // 88 pin EVB

#define BOARD_NO                            BOARD32

// ====== Application Types ======
#define Application_Generic_2L_HBR3       	2
#define AppType_Generic_4L_HBR2             5
#define Application_Fpga                    20

#define ApplicationType Application_Generic_2L_HBR3
// #define ApplicationType AppType_Generic_4L_HBR2

// ====== PCB Evaluation Function ======
// Thses Compiler options need to be disabled after evaluation !!!
//#define DebugEn_Hdlr_DpRxPhyCFG
// ====== End of PCB Evaluation Function ======

#define DBG_Mantis_2924_S21_DEX_1080P_HS_SyncPolarity_issue

// Yuv420 Related
#define EDID_modify_M_2778_A2141_YUV420_Supported
    // Mantis 2778 A2141 will check HDMI2.1 VSDB Byte[7] BIT0 DC_30Bits_420
    // so need always turn on this bit when EDID has HDMI2.1 VSDB.
#define Mantis_2265_iPad_HDR
    // When MNT is HDMI 1.4 4k30 with YUV420, need setting CFG_BranchDevice
    // for iPad can't select HDR
// End of Yuv420 Related

#define Implement_4K60_537Mhz
    // Replace 4K60_594 DTD to 537.3MHz DTD
    // Source almost support 4K60_537Mhz in HBR3_2L,
    // and transfer 594Mhz to all 4K60_594 monitor.
#define Implement_NoY420_Replace4K60594to4K60RB
    // If EDID has not YUV420 but DTD is 594 Mhz.
        // replace 4K60Hz 594Mhz to 4K60RB 533MHz.
        // Sink might support 4K60RB and display 4K60 resolution.
#define DBG_Ipad_Pro_Replace_4K60_Issue
    // When Source is ipad pro, don't replace to 4k60RB.
    // Don't replace to 4k60RB anymore.

#define DBG_M_2745_A1990_Remove_Deep_Color_Support
    // Mantis 2745 MACBOOK PRO 2018 2019 (A1990) with HPN363B-HP 27F 4K
    // need filter 10 bit Deep Color(YUV422), so A1990 will using YUV444.

#define Mantis_2590_EDID_0x83_Audio_not_supported
    // Mantis 2590: HDMI2.0 EDID 0x83 Audio bit not supported,
    // but can't filter to 1080P

//#define DBG_Mantis_2569_AcerChromeBook_EDIDTag0x0Efilter
    // filter EDID TAG 0x0E to 0x0F and repleace SVDs VIC 4k60(97)
    // Remove this workaround (Disable this compile option) for QA mantis 1014
        // HP OMEN X 2S + GIGABYTE M28U may show 4K/24Hz YCbCr420 item.

// ====== Customer Board Dependent ======
#define Mantis2635_NintendoSwitch_LtIssue
//#define DBG_Mantis_2436_modify
#define DBG_DpRxLtSetAdjReq
// Mantis 2293 HP NB issue need modify DPRX LT Voltage Swing LV, Pre emphasis LV
// ====== End of Customer Board Dependent ======

// ====== Options ======
// #define GET_MFG_INFO_NEW_FLOW
    // new flow of ask GET_MFG_INFO.
        // if source did not ask GetMfgInfo before DPRX HPD high, do the following action:
        // 1.check OUI 550ms later after DPRX HPD high, toggle DPRX HPD if OUI is Apple.
        // 2.after toggle HPD from high to low, ask GetMfgInfo ,and then toggle HPD from low to high.
        // 3.initialize global variables in ClrAltModeState()
// #define SRC_2_SNK
#define CC_ADC
//#define CTS_SRC
//#define REVERSE_CHARGE
#define TCPC_ROMCODE
#define DPRX_PHY_BY_BOARDH
#define SUPPORT_NINTENDO
#ifdef SUPPORT_NINTENDO
    #define SUPPORT_NINTENDO_SHOW_SCREEN
    #define LEGACY_SUPPORT_NINTENDO
    // #define SUPPORT_NINTENDO_FIXED_PDO
#endif  // SUPPORT_NINTENDO
//#define ADC5_TempMonitor
#define Pd_Module_Cable_Orientation
// Distinguish if DP cable is reversed according to existing function on PD module.

//#define Modify_HUB_Timing_A2377_M1_issue
// when sink mode need turn on HUB early

#define Modify_DPRX_CDRP
// Mantis 2293 M1 ipad pro 2377 issue, DPRX PHY need modify from Steven suggest!
    //#define Modify_DPRX_CDRP_HubCtrl

#define Mantis_758_VGA_Luminance_setting
    // SA suggest 0x8290 = 0x05, when VDD12=1.28V
#define Mantis_720_VGA_EDID_issue
    // VGA MNT EDID need add SVDs 720P/480P.

// ====== FAE Options ======
#define EDID_Mantis_1903_HDMI_1920_1080_50Hz
//for FAE Mantis 1903 HDMI MNT Sharp(LCD-50TX55A) EDID with 1920*1080p 50Hz issue.

#define EDID_Mantis_2133_filter_Video_Data_Block_SVDs
// for FAE Mantis 2133 MNT:KU27F144M(Manu Info: TRG2720) SVDs error
// ====== End of FAE Options ======

// #define HDCP_CTS
#ifdef HDCP_CTS
    #define HdmiTx1p4_HdcpCTS  
    #define DpRx1p4_LinkLayerCTS
    #define HdmiTx2px_CTS
#else   // HDCP_CTS
#define GET_MFG_INFO
    // HDCP22 need use this define for identify Samsung Source!!!
#define Support_Xiaomi_BookS    1
#define Get_Src_Caps_Ext        2
#define Workaround_Type     Get_Src_Caps_Ext
#endif  // HDCP_CTS

//#define MODIFIED_FCLK // Speed up SHA-256 calculator

#define Modify_v2p16p7_Nintendo_HDMI_Issue
//#define Modified_v2p16p6_PD_EDID_Collide
#define Modified_v2p16p5_Nintendo_issue

//#define Modified_MacMiniNo4KIssueSolved
// It's no use for issue 28, so turn off this define.

#define DBG_4k60_change_to_480p_fail

//#define DPCD_TEST_DSC_FEC
	// Merak D for test DELL XPS9300 NB HBR3 2L 4K60 YUV422
	// this define turn on will let Source send DSC&FEC
	// Merak D LT will Fail, only for Teset!!!

//#define DPRX_M1_ipad_pro_use_Lane02_lane13
// M1 ipad pro will use Lane0 and Lane2(Positive Plug),
// Lane1 and Lane3(Negative Plug),
// So need open all Lanes.

#define DBG_HDCP_Ri_fail
//#define DBG_YUV422_4k60_DPCD_setting

// ====== Investigation Defines ======
//#define Investigation_DpRxPHYCFG
    // Review the DpRx PHY programming and its sequence according to design Spec.
// ====== End of Investigation Defines ======

// ====== 2020 CTS for new structure ======
#define CTS_MODE
//#define DEBUG_STATE
// ====== End of CTS Defines ======

// ====== Implementation Defines ======
#define Implement_DpCableDetect
    // Figure out other better way for DP connection detection ......
// ====== End of Implementation Defines ======

// ====== Definition regards of Chip Version ======
//#define ENGINEERING_MODE
    // flash is sip. turn on this define when code crash can save to IROM.
// ====== End of Definition regards of Chip Version ======

#define MCU_TIMER_0                         1
#define MCU_TIMER_1                         2
#define TCPC_TIMER                          MCU_TIMER_1
    #define TIMER_Optimized_UnusedFuncs

#define WDT_EN
    // The WDT needs to be fed even in Debug Mode !
    #define Optimized_ChipWDT_Unused
        // The HW WDT (not MCU one) was NOT enabled for all of Projects currently. So keep it disabled as it was !
            // Since ap_WDTInit() is called first than ap_InitMessageHandler(), so both EnableSWDT and 
                // EnableHWDT variables are still 0x00. It means both SWDT and HWDT function are Disabled
                // in all current Projects !!!

#define RXBUFFER_ROMCODE                    0
#define RXBUFFER_PASS_PD_MSG                1
#define RXBUFFER_PASS_TCPC_PORT             2

//#define RXBUFFER                                            RXBUFFER_ROMCODE
#define RXBUFFER                                            RXBUFFER_PASS_PD_MSG
//#define RXBUFFER                                            RXBUFFER_PASS_TCPC_PORT

// ====== Application Types ======
#if (ApplicationType == Application_Generic_2L_HBR3)
#define Transmit_U3_Signal
#ifdef GET_MFG_INFO
	//#define DBG_ipad_pro_EDID_Repleace_4k60RB
		// When Source is ipad pro need repleace 4k60RB to 4k60 594Mhz
		// When 2L setting Enable this define for identify ipad pro
#endif	// GET_MFG_INFO

//#define EDID_4K60RB_Supported_By_Manufacturer
// for FAE add MNT Manufacturer support 4k60RB, repleace 4k60 594MHz to 4k60RB.

#define Crystal_Mode

#define DpRx_LinkConfig    2   // 2L_HBR3  (or HBR3 / 1L for Debug)

#define Function_AudioCapableVga
    // When Vga connected only, still make the Audio stream down to Sink device.
#endif  // (ApplicationType == Application_Generic_2L_HBR3)

#if (ApplicationType == AppType_Generic_4L_HBR2)

#define Feature_4K60RB_NotSupported
// Replace 4K60RB Timings to standard 4K60 one.
// for 4L HBR2 S21 will output 533&10bit HDR = 666MHz.

#define Crystal_Mode

#define DpRx_LinkConfig    5   // 4L_HBR2
#define LinkConfig_4L

#define Function_AudioCapableVga
    // When Vga connected only, still make the Audio stream down to Sink device.
#endif  // (ApplicationType == AppType_Generic_4L_HBR2)


#if (ApplicationType == Application_Fpga)
#define FPGA
#endif // (ApplicationType == Application_Fpga)


// ====== Compile Options - Application dependent ======
#define HdcpFunction_EN
    // See Hdcp2xRx.h for detail Compile options.

// 1) ====== Compiling Relative ======
// ====== End of Compiling Relative ======

// 2) ====== System Relative ======
#define Modified_VarsInit_PwrUpOnce
    // Initiates those variables once at power up stage.
    #define Modified_VarsInit_PwrUpOnce_EdidVars
        // Actually all Edid related variables are required to do the same - no need to be reset
            // if re-enter the Alt-Mode. Put eyes on whether it causing side-effects or not !
#define Improvement_DpRxInit
    // Remove unnecessary 256 bytes Edid read happening right after power up.
//#define Modified_ConditionTimerEvents
    // The 16Bits SYS_ap_TimeUp() function has potential problem - when TimeUp checking is after 65535ms, the
        // result could be False if the condition ((Current Time - The 16Bits Timer) < The TimeSpan) is reached.
        // Transfering the Timer checking result to EventFlags so no need to keep checking the TimeUp.
#define CtrlMethod_SpecialGpio
    // For those GPIOs which Reading and Writing is from different cells, its control method is special.
#define SyncCableDetection
    // This is mainly for the case that system boots up with Vga and Hdmi cables connected
    #define Improvement_CableDetSync
        // A new method to make both Hdmi and Vga are recognized as connected at same time for the case
            // that System powered up with both Hdmi and Vga cables connected.
//#define VgaCableDetection_RTerm
    // This is to detect the termination on RGB. This function is mainly for the condition: Vga cable is plugged in PCB end but
        // disconnected on the Monitor end.
#define EnableIspFromEeprom
// ====== End of System Relative ======

// 3) ====== System (HDCP) Relative ======
#define Modified_HdmiPowerOffDetected
    // When Hport inaccessible for a certain period, check Rsen to tell whether the Hdmi is in power OFF stage or not.
    //#define HdcpOffWhenScreenOff_ButNotHdcpNoCapableSink
        // Implements this later !
            // The key thing should be solving how to tell whether Hport inaccessible is happening while MNT OFF.
        // Mantis 431
        // On dual display plug in and closed HDMI screen display
        // We will identify not Hdcp_No_Capable_Sink and disable DPRX_HDCP_CTRL(0x8680 bit0) => VGA dispaly ON.
        // After open HDMI screen display(not HDMI plug in), reset gB_NotHdcpCapableSink and notice Source Edid is changed.
#define NewMethodToEnableHDCP_SystmeLevel
    // If downstream device has no HDCP capability, such like Vga, the Authentication of DpRx Hdcp should not be took place.
// ====== End of System (HDCP) Relative ======

// 4) ====== CC / PD Relative ======
// ====== End of CC / PD Relative (Fw Structure) ======

// 8) === Link Training Related Modification ===
#define Optimized_DpRxLtSet_PreEmDrvCur
    // Optimized function calls of setting PreEm and DrvCur.
#define Modified_DPRXPHY_Clock_inverted
    // 1) by MS suggest turn on DPRX PHY lane0/1/2/3 CLK INV enable(0x8636[0~3] low active)
        // and turn off 0x855F[4~7] digital clock INV
    // 2) 0x855F digital clock L0 need inverted for 4L HBR2 and 2L HBR3
#define DpRxPHY_SeQCFG_Test_00
    // Changing Ctrl2 and Ctrl3 based on Bit Rate is NOT the root cause of Shooting Line. Lane 0 inversion does !
#define Modified_DpRxPHY_ByBitRate
    // Configure PHY settings according to the current bit rate.
// === End of Link Training Related Modification ===

// 8a) ====== ComboRx Related ======
//#define Modified_v0p5p0_ComboRxSettings
    // It should be 0xF0 for 16x according to the design note - merak_b_analog_control_reg _20210512.xlsx.
    // Keep it no change for now to make minimun changes.
// ====== End of ComboRx Related ======

// 9) === DpRx Related Modification ===
#define Workaround_SrcValidVscInfo_Unstable
    // Some of Source devices sending MISC_1[6] = 1 but VscSdp_HB1 = 0x00 (about every 10 seconds), and in 
        // this case, we should ignor it and NOT update those Pixel Encoding / Colorimetry Format variables.
    // Workaround_SrcValidVscInfo_Unstable_01
        // If the bit VSC_SDP_STATUS is NOT set, it means the Info from DPRX_MS_FORMAT is valid no matter 
            // the value of DpRxPktMem_VscSdp is valid or not.
        // The Color Depth unstable (6bpc, 8bpc alternately changed) happening in HP G7 Book needs to be double 
            // chekeced again whether it is impacted or not !!!
    #define Modified_ColorFmt_ValidRead_SdpClrSeQ
        // The VSC Data is in SDP, therefore the sequence to clear Sdp Packets does matter !!!
        #define Modified_ColorFmt_ValidRead
            // Some of Source devices not follows Spec very well. Conditional read the VSC is required.
            // This compile option is still needed even Modified_ColorFmt_ValidRead_SdpClrSeQ is implemented !
        #define Optimized_SdpClrSeQ
            //#define Optimized_SdpClrSeQ_RegsWord
                // This IrQ clearing should be WORD not BYTE. However it did not problem till now, so still 
                    // keep it disabled for now !
            //#define Optimized_SdpClrSeQ_gB_DpRxAudioEnabled
                // Those codes are ununsed because gB_DpRxAudioEnabled is always being FALSE !
                // Leave what it is for now. Modify it later for better controlling flow !!!
// === End of DpRx Related Modification ===

// 9a) === DpRx Related Modification (DPCD) ===
#define Modified_Dpcd_SupportTPS3
    // Supports TPS3 if DP1.2 or higher.
// === End of DpRx Related Modification (DPCD) ===

// 10) ====== Aux Related ======
#define Modified_NdsColorRange
    // Color Range detection for Nintendo Switch only.
    // Actually the OUI NDS using is same as the one of nVidia. Therefore needs to check the 
        // value of Nds_DpcdAddr_ColorRange to confirm whether it is NDS or not.
    #define Modified_NdsColorRange_Hdlr
        // This Hdlr is to monitor whether NDS Color Range is changed or not.
        #define Modified_NdsColorRange_DpcdAddr
            // DPCD [00580] is mapped to 0x9F80.
        #define DBG_NdsColorRange_Hdlr
// ====== End of Aux Related ======

// 11) === Vdds Settings Related Modification ===
#define Modified_GetSourceType_Hbr3Hdled
    // This is implemented for being able to handle the M value of HBR3.
    //#define Modified_GetMvalOfst_Hbr3Hdled
        // Mval Offset adjustment according to the Bit Rate.
#define Modified_VddsSettingImproved
    // This is to see whether it helps for solving wash-screen or not. (No difference between 0x80 and 0x90)
        // Actually it is not Wash-Screen, it is 2 Lanes not Sync symptom.
    // Keep eyes on for this change whether it makes the performance worse or not !
    #define Modified_SetVddsCtrl
        // Regarding the experience in PolarisF, Ctrl1 needs to be set 0x80 if Vga is connected.
#define Investigation_8p1G_4K24_GainCorrection
#define Modified_CalcMval_RCLK486
    // RCLK now is 486MHz instead of 324MHz. Always takes 0x80000 as N for M calculation.
// === End of Vdds Settings Related Modification ===

// 11a) ====== Display Related ======
#define Investigation_DeepColorIssue_HTotal
    // This is a workaround for solving Deep Color issue - A 8 diviable HTotal is required !
    // [20220519] According to Digital team, this adjustment just need to apply to Line Buffer. No
        // need to change Hdmi Digital block to have minimun impact to Hdmi Reciever !
    #define Modified_A2141_AcerXB273K_4K24_NoMod8
        // Adjust HTotal to 8-dividible value in 10 bits Color mode makes AcerXB273K no display.
#define Modified_GetPixelClock_Calculation
    // Samsung S20p and S21. Its N is around 0xFD40 while M is about 0xF9F60 at 4L HBR2 533MHz mode.
        // This results the calculation overflow of function - api_DpRxMsGetPixelClock().
    #define Modified_PclkCalcThresh
        // Calculation overflow at HBR2 with special Source Device like MiBooks.
#define Implement_HDR10
    #ifdef Implement_HDR10
    #define Implement_HdrDpRxPktMemClr_StateMachine
        // Handle the HDR PktMEM clearing in State-Machine method.
        #define Implement_HDR10_DpRxPktMem_Clear // for QA Mantis 709
            // HDR related issue solved as well.
            // Right timeframe to clear the Value. It seems the Source has strange behavior !
            #define Modified_DpRxPktMemClr_HDR
                // DPRX_HDR10_EOTF is used for configuring AVI InfoFrame so it (in memory) needs to be consistent
                    // with real status.
    #define Modified_DRIFChkSum
        // The Checksum needs including all three Header bytes !
        #define Modified_DRIFChkSum_SDR_w_ZeroMetaData
            // HF1_53 Iter 01.
    #define Modified_Hdr2Sdr
        // Sync HDMI_HDR_EOTF to DPRX_HDR10_EOTF so the register rHDMI_AVIF_PB2 can be configured properly.
    #define Feature_Colorimetry_Supported
    #define Feature_DeepColor_Supported
        //#define Modified_TmdsCFG_SscpAllIf10Bits_NoNeedAnyMore
            // [20220411] - Daisy test this with one of MBPs (A2338) which supports HDR10 and confirmed the Display blinking. 
                // So this work-around is still required !!!
            // Since optimizing the Fw flow from system point of view, this SSCP_ALL problem is no more observed.
                // PS: The "SSCP_ALL problem is no more observed" is investigated with QD980 !!!
                // It seems it is not Hw related problem. Keep eyes ON for this symptom !!!
                // Figure out the root-cause later !!!
                    // [20220408]: Root cause found. The input of TmdsPLL was selected from VCLK (VDDS1) which causing
                        // this SccpAll issue. Now the input of TmdsPLL is selected from VCLK2 (VDDS2) and the problem is 
                        // no more observed.
        #ifdef Modified_TmdsCFG_SscpAllIf10Bits_NoNeedAnyMore
        #else   // Modified_TmdsCFG_SscpAllIf10Bits_NoNeedAnyMore
        #define Modified_TmdsCFG_SscpAllIf10Bits
        #endif  // Modified_TmdsCFG_SscpAllIf10Bits_NoNeedAnyMore
            // For 10bits cases, use previous SSCP method to overcome Display blinking issue.
            #define Modified_SscpProgSeQ
                // Write the changes to those registers once at the time. This is trying to avoid any
                    // unexpected symptom happened due to twice setting up.
                #define Modified_SscpProgSeQ_8bits
                    // Set the bit - DIP_COND_SEL only for 8bits condition.
                    // Several Sink devices have problem if setting this DIP_COND_SEL in 10bits !
                        // Problem Sinks: 1) LG 27UL850 [Mantis 866] 2) Acer XV282K [Mantis 894].
    #define Feature_HDR_Supported
    #define Feature_YUV420_Supported

    #define Implement_VSC_SDP
        #define Implement_VscSDP_NoVscIfVgaConnected
            // No need to declare VSC supported if Vga is connected.
        //#define Modified_ColorFmt_ValidRead
            // Some of Source devices not follows Spec very well. Conditional read the VSC is required.
        //#define Modified_ColorFmtChangeTol
            // Some of Source devices still require De-bounce mechanism.
        #define Fix_HDR_Info_HWIssue
            // For 4 Lane case, the HDR information is incorrect in Registers. So Get HDR info from MEM instead.
    #endif  // Implement_HDR10

#define Implementation_4K60
    #ifdef Implementation_4K60
    #define Implementation_4K60_DualPixelMode
        // Disable this compile option for enabling Single Pixel Mode !
        #ifdef Implementation_4K60_DualPixelMode
        // Dual Pixel mode if 4K60. Others are Single Pixel mode so it will be able to support 10 Bits color.
        #else   // Implementation_4K60_DualPixelMode
        #define Modified_GainCorrSequence_ChangeGainOnly
            // Looks like the mechanism of Clock Correction is blocked for some reason. Try with different values.
            // Set to the value 0x03 looks OK and even no sequence change required compared to before !!!
            // The value was set to 0x01 and it required special sequence if adapting Single Pixel Mode in 4K60.
            // Note: The above symptom was observed with my X1 laptop !!!
            //#define Modified_GainCorrSeq_TimeToCloseLoop
            // The DdsFreQ will be no meaning before Gain Correction is enabled.
            #ifdef Modified_GainCorrSequence_ChangeGainOnly
            #else   // Modified_GainCorrSequence_ChangeGainOnly
            #define Modified_GainCorrSequence
            // Correction Gain needs to be toggled to get Display. Figure it out now !
            #endif   // Modified_GainCorrSequence_ChangeGainOnly
        #endif  // Implementation_4K60_DualPixelMode
    #define LineBufCtrl_SyncPolarity
        // Line Buffer refers to DE and output the Timing as its Registers programming.
        // Since the output of Line Buffer is always Positive Sync, no need to do the inversion
            // again in DP_TOP block and Hdmi block as well.
    #define Modified_v0p6p2_SscpIssueFixed
        // SSCP packeting issue fixed in MerakD.
    #endif  // Implementation_4K60
// ====== End of Display Related ======

// 11b) ====== Display Related [HDCP] ======
//#define Improvement_HdcpStateHdle
#define Improvement_HdcpStateHdle_InvalidBksv
    // When non-Hdcp-capabile Sink is recognized, set gB_HdcpHdlrState to apt_HdcpHdlrState_CapInit.
    //#define Improvement_HdcpStateHdle_InvalidBksv_Method_2
        // The modification is not completed yet !
// ====== End of 11b) Display Related [HDCP] ======

// 12) ====== Audio Related ======
//#define DBG_Mantis_3040_3440x1440_30Hz_YUV444_8bitsColor
    //Mantis 3040, A1990 & older mac products send weird audio in this condition.Change 0x6F into 0x67 in 0x8A6E.

#define Modified_SteamDeck_KonkaTV
    // Audio NG when SteamDeck connected to a specific Konka TV.
#define Optimized_AudioHdlrImpmnt
#define AudHdlrImpmnt_FineTuneAudM
    // No any adjustment is required if the intension of Diff is zero !
#define AudHdlrImpmnt_AudioOn_HdcpAuthen
    // Turn Audio DAC ON after Hdcp Authentication.
        
#define Modified_AudioHdlrImprovement
    // The gB_AudioState will stay with apt_AudioState_Initiated until the enable condition is reached !!!
    // For current application, once the Audio Block is enabled, it will be kept ON without being disabled.
    //#define Optimized_AudioCtrl
        // AUDIO_EN is initiated as Disabled.
    #define Modified_AudioHdlrImprovement_AudioEN
        // Proper timeframe to enable Audio.
    #define Modified_AudioCtrlSeQ
        // Huawei Mate 10 Pro 2560x1440p60 (AUS28A0 VG28UQL1A) Audio Packet Buffer issue.
            // This is to make sure setting AUDIO_EN will be happening after DPC_EN is set !!!
#define AudioDAC_6dB
    // Setting for Audio DAC being able to reach 6dB
    #ifdef AudioDAC_6dB
    #define AudioDAC_6dB_IfResetIsNeeded
        // Keep original design program sequence (DAC reset is required before turning it ON).
    #endif  // AudioDAC_6dB
#define AudioAlwaysOutputToHeadset
    // Audio always output on headset when source has audio. Mantis 423, 429.
#define Implement_AudioDAC_PwrOnOnce
    // Turn ON Audio DAC only once at first time it is requested to be ON. Once it has been turned ON,
        // it will be kept ON until the system enter low power mode if the Power consumption does matter.
    #define Implement_AudioDAC_PwrOnOnce_KeepVolt
        // [20230525] The AudioDAC voltage setting is set to 01b when processing Hdcp2p3 of DpRx and back 
            // to 00b if the AudioDAC setting ON after that. This voltage switching will make Po sound 
            // heard on Speaker. To get rid of this phenomenon, keep the same AudioDAC voltage is necessary. 
            // According to Analog designer, 01b setting for AudioDAC will not affect the DAC performance.
#define Optimized_AuddsConfig
    // Not well optimized yet. Working on this later !
// ====== End of Audio Related ======

// 14) ====== Edid Related ======
#define Edid_Block_0_Retry
    // for I2C Retry EDID Block 0 !!!
//#define ModifyManuInfo_HuaWeiStrangeSystemBehavior
    // Just change the Manu Info slightly to overcome HuaWei strange system behavior
#define SmallSizeDisplayDetection
    // Attach 720p for those Sink devices which native resolution is less than 1080p
    // For SVDs, the default prefer VIC is 0x10, 1080p. Needs to be changed to 0x04, 720p, if this function enabled.
    //#define Conditional_SetMaxBR_HBR
        // Some of Source Devices will not go lower than HBR2 if this one is set to 0x14 !
#define Investigation_DviPinkDisplay
    // MacBook series Source will always output Yuv if the ManuInfo is VSCE02C
    #ifdef Investigation_DviPinkDisplay
    #define Implement_DviPinkDisplay_ReplaceProductCode
        // VSCE02C => VSC0E28
    //#define Investigation_DviPinkDisplay_Csc
        // In case the Source insisting to send YUV format. Need 3x3 coefficent table to complete the implementation !!!
    #endif  // Investigation_DviPinkDisplay
//#define DviCnect2HdmiPort
    // Support 1920x1200 resolution
    // Not only DTD but also SVD ......
// ====== End of Edid Related ======

// 15) ====== DpRx CTS Related ======
#define DpRxPhyAutomation
    // Due to inproper compile option settings (WA_iPad_01 is disabled), the Automation is running at the condition the
        // TreatCrLockedLevel is 0x3333 which means during the LT, the CR or SL is always reported as Lock. But anyway,
        // it should not make difference for the Automation result.
#define DpRxCTS_LinkLayer
    // This compile option will be always enabled until new compatibility issues observed.
#define DpRx_1p2_CTS_CRCUpdate
    // Changed since 20220531 from Branch DP1.2 CRC modify
	// This is for DP1.2 CTS No.5.4.1.1, 5.4.1.3, 5.4.2 item
	// with update DPRX_TEST_CRC_R DPRX_TEST_CRC_G DPRX_TEST_CRC_B
// ====== End of DpRx CTS Related ======

// 16) ====== HdmiTx Relative ======
#define Modified_v0p30a_HdmiCableDetection
    //#define Modified_v0p30d_HdmiCableDetection_I2C_ThinkAboutLLater
        // Before entering AltMode (gB_AltModeState = 2), cable status variables, such like gB_HdmiCableDetectState
            // will not be updated any more. So if unplugging TypeC Alt Port with Hdmi cable connected, the status of
            // gB_HdmiCableDetectState will be kept at 2. When TypeC Alt Port is plugged again with Hdmi cable disconnected
            // and successfully enter Alt Mode, the time span HdmiCableDetect_CableLost_TimeSpan will be waiting with the
            // condition that Hdmi is still treated as connected.
// ====== End of HdmiTx Relative ======

// 16a) ====== HdmiTx Configuration Relative ======
#define Modified_TmdsCFG
    #ifdef Modified_TmdsCFG
    #define Modified_TmdsCFG_x1p25_New
        // New Tmds settings for x1p25 mode.
    #define Modified_TmdsCFG_x1_Mode
        // Enable Tmds PLL in x1 mode. It recommends taking the reference from Vdds if in x1 mode.
        // Analog Team recommends still enable Tmds PLL in x1 modes to reduce jitter affecting !
    //#define Modified_TmdsCFG_SinglePixelMode
        // Change back to Vdds clock instead of iTMDS_CLK for single pixel mode.
            // It seems the TmdsPLL doesn't perform well in low pixel clock mode.
                // [20210528]: TmdsPLL performs well with proper x1 parameters setup !
    #endif  // Modified_TmdsCFG
// ====== End of HdmiTx Configuration Relative ======

// ====== Configure feature by project ======
#define EXT_RAM
    #ifdef EXT_RAM
    // Since those CC functions which require fast response had been moved into IROM, the EXT_RAM seems no longer needed
    // unless there are other functions need to have fast response !!!
    #define EXT_RAM_SEGMENT 0x8F200000UL
    #define No_RamCodeAlloc
        // Investigating whether running at RAM code is necessary or not.
    #ifdef No_RamCodeAlloc
    #else   // No_RamCodeAlloc
    #define EXT_RAM_RamCodeAlloc
    #endif  // No_RamCodeAlloc
    #endif  // EXT_RAM

#define USB_EN
//#define CEC
#endif  // _CONFIG_H_