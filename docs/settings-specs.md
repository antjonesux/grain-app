# Settings Page Build

---

The settings page should be built in this order:
1. Settings page
2. Name drawer
3. Email address drawer
4. Password drawer
5. Appearance drawer
6. Sign out drawer
7. Delete account drawer

---

Settings page
Code:
<div style={{width: '100%', height: '100%', position: 'relative'}}>
    <div style={{width: 360, height: 800, left: 0, top: 0, position: 'absolute', background: 'var(--bg, #0D0F14)', overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
        <div style={{width: 361, height: 28, paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, overflow: 'hidden', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
            <div style={{textAlign: 'center', color: 'var(--text-muted, #7D8093)', fontSize: 12, fontFamily: 'SF Pro Text', fontWeight: '600', lineHeight: 16, wordWrap: 'break-word'}}>9:41 AM</div>
            <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', gap: 3, display: 'flex'}}>
                <div style={{width: 21, height: 14, position: 'relative'}}>
                    <div style={{width: 16.50, height: 10, left: 2, top: 2, position: 'absolute', background: 'var(--text-muted, #7D8093)'}} />
                </div>
                <div style={{width: 15, height: 14, position: 'relative'}}>
                    <div style={{width: 14.25, height: 10, left: 0, top: 2, position: 'absolute', background: 'var(--text-muted, #7D8093)'}} />
                </div>
                <div style={{width: 1.50, height: 4.90, opacity: 0.40, background: 'var(--text-muted, #7D8093)'}} />
                <div style={{width: 20, height: 7.50, background: 'var(--text-muted, #7D8093)'}} />
            </div>
        </div>
        <div style={{width: 360, flex: '1 1 0', paddingLeft: 24, paddingRight: 24, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                    <div style={{alignSelf: 'stretch', paddingTop: 8, paddingBottom: 16, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                        <div style={{width: 20, height: 20, position: 'relative', overflow: 'hidden'}}>
                            <div style={{width: 11.67, height: 6.67, left: 4.17, top: 6.67, position: 'absolute', outline: '2px var(--text-secondary, #8B8FA3) solid', outlineOffset: '-1px'}} />
                        </div>
                        <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'inline-flex'}}>
                            <div style={{flex: '1 1 0', color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'}}>Settings</div>
                        </div>
                    </div>
                    <div style={{alignSelf: 'stretch', paddingBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                        <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                            <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'}}>account</div>
                        </div>
                        <div style={{width: 312, paddingLeft: 16, paddingRight: 16, paddingTop: 18, paddingBottom: 18, background: 'var(--bg-card, #161921)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                            <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 12, display: 'inline-flex'}}>
                                <div style={{alignSelf: 'stretch', paddingBottom: 12, borderBottom: '1px var(--border, #2A2D3A) solid', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
                                    <div style={{color: 'var(--text-primary, #F0F0F5)', fontSize: 15, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 24, wordWrap: 'break-word'}}>Name</div>
                                    <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>Jamie</div>
                                        <div style={{justifyContent: 'center', alignItems: 'center', gap: 4, display: 'flex'}}>
                                            <div style={{width: 16, height: 16, position: 'relative', overflow: 'hidden'}}>
                                                <div style={{width: 9.33, height: 4.67, left: 10.67, top: 3.33, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: 'top left', outline: '2px var(--text-muted, #7D8093) solid', outlineOffset: '-1px'}} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{alignSelf: 'stretch', paddingBottom: 12, borderBottom: '1px var(--border, #2A2D3A) solid', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
                                    <div style={{color: 'var(--text-primary, #F0F0F5)', fontSize: 15, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 24, wordWrap: 'break-word'}}>Email address</div>
                                    <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>email@email.com</div>
                                        <div style={{justifyContent: 'center', alignItems: 'center', gap: 4, display: 'flex'}}>
                                            <div style={{width: 16, height: 16, position: 'relative', overflow: 'hidden'}}>
                                                <div style={{width: 9.33, height: 4.67, left: 10.67, top: 3.33, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: 'top left', outline: '2px var(--text-muted, #7D8093) solid', outlineOffset: '-1px'}} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
                                    <div style={{color: 'var(--text-primary, #F0F0F5)', fontSize: 15, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 24, wordWrap: 'break-word'}}>Password</div>
                                    <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>******</div>
                                        <div style={{justifyContent: 'center', alignItems: 'center', gap: 4, display: 'flex'}}>
                                            <div style={{width: 16, height: 16, position: 'relative', overflow: 'hidden'}}>
                                                <div style={{width: 9.33, height: 4.67, left: 10.67, top: 3.33, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: 'top left', outline: '2px var(--text-muted, #7D8093) solid', outlineOffset: '-1px'}} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{alignSelf: 'stretch', paddingBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                        <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                            <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'}}>Appearance</div>
                        </div>
                        <div style={{width: 312, paddingLeft: 16, paddingRight: 16, paddingTop: 18, paddingBottom: 18, background: 'var(--bg-card, #161921)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                            <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 12, display: 'inline-flex'}}>
                                <div style={{alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
                                    <div style={{color: 'var(--text-primary, #F0F0F5)', fontSize: 15, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 24, wordWrap: 'break-word'}}>Theme</div>
                                    <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>Dark</div>
                                        <div style={{justifyContent: 'center', alignItems: 'center', gap: 4, display: 'flex'}}>
                                            <div style={{width: 16, height: 16, position: 'relative', overflow: 'hidden'}}>
                                                <div style={{width: 9.33, height: 4.67, left: 10.67, top: 3.33, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: 'top left', outline: '2px var(--text-muted, #7D8093) solid', outlineOffset: '-1px'}} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{alignSelf: 'stretch', paddingBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                        <div data-icon="false" data-property-1="Outline" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 14, paddingBottom: 14, background: 'var(--bg-card, #161921)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                            <div style={{color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '500', lineHeight: 19.50, wordWrap: 'break-word'}}>Sign Out</div>
                        </div>
                        <div data-icon="false" data-property-1="Text" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 4, paddingBottom: 4, borderRadius: 14, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                            <div style={{color: 'var(--status-misaligned, #D47B7B)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>Delete Account</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

Style:
// Appearance
color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'
---
// Choose how the app looks on this device.
color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// theme
color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'
---
// Dark
color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// Light
color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// System
color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'


--

Name drawer

State 1:
Code:
<div style={{width: '100%', height: '100%', position: 'relative'}}>
    <div style={{width: 360, paddingLeft: 24, paddingRight: 24, left: 0, top: 0, position: 'absolute', background: 'var(--bg-card, #161921)', borderTopLeftRadius: 22, borderTopRightRadius: 22, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
        <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                <div data-property-1="Header2" style={{alignSelf: 'stretch', paddingTop: 24, paddingBottom: 8, justifyContent: 'flex-end', alignItems: 'center', display: 'inline-flex'}}>
                    <div style={{width: 20, height: 20, position: 'relative', overflow: 'hidden'}}>
                        <div style={{width: 11.67, height: 11.67, left: 4.17, top: 4.17, position: 'absolute', background: 'var(--text-secondary, #8B8FA3)'}} />
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingTop: 32, paddingBottom: 8, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'}}>Your name</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>This is how you&apos;ll appear across your goals and activity.</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 6, display: 'flex'}}>
                    <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', display: 'flex'}}>
                        <div style={{alignSelf: 'stretch', paddingBottom: 14, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                            <div data-icon="false" data-property-1="Text" data-property-2="Empty" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                                <div style={{flex: '1 1 0', color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>Jamie</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingTop: 28, paddingBottom: 40, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 12, display: 'flex'}}>
                    <div data-icon="false" data-property-1="Disabled" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 14, paddingBottom: 14, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '500', lineHeight: 19.50, wordWrap: 'break-word'}}>Save</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

Style:
// Your name
color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'
---
// This is how you&apos;ll appear across your goals and activity.
color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// Jamie
color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// Save
color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '500', lineHeight: 19.50, wordWrap: 'break-word'

State 2: 
Code:
<div style={{width: '100%', height: '100%', position: 'relative'}}>
    <div style={{width: 360, paddingLeft: 24, paddingRight: 24, left: 0, top: 0, position: 'absolute', background: 'var(--bg-card, #161921)', borderTopLeftRadius: 22, borderTopRightRadius: 22, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
        <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                <div data-property-1="Header2" style={{alignSelf: 'stretch', paddingTop: 24, paddingBottom: 8, justifyContent: 'flex-end', alignItems: 'center', display: 'inline-flex'}}>
                    <div style={{width: 20, height: 20, position: 'relative', overflow: 'hidden'}}>
                        <div style={{width: 11.67, height: 11.67, left: 4.17, top: 4.17, position: 'absolute', background: 'var(--text-secondary, #8B8FA3)'}} />
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingTop: 32, paddingBottom: 8, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'}}>Your name</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>This is how you&apos;ll appear across your goals and activity.</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 6, display: 'flex'}}>
                    <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', display: 'flex'}}>
                        <div style={{alignSelf: 'stretch', paddingBottom: 14, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                            <div data-icon="false" data-property-1="Text" data-property-2="Filled" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                                <div style={{flex: '1 1 0', color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>Jamie Lee</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingTop: 28, paddingBottom: 40, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 12, display: 'flex'}}>
                    <div data-icon="false" data-property-1="Primary" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 14, paddingBottom: 14, background: 'var(--accent, #10B981)', borderRadius: 14, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                        <div style={{color: 'var(--bg, #0D0F14)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '500', lineHeight: 19.50, wordWrap: 'break-word'}}>Save</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

Style:
// Your name
color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'
---
// This is how you&apos;ll appear across your goals and activity.
color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// Jamie Lee
color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// Save
color: 'var(--bg, #0D0F14)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '500', lineHeight: 19.50, wordWrap: 'break-word'

--

Email drawer

State 1:
Code:
<div style={{width: '100%', height: '100%', position: 'relative'}}>
    <div style={{width: 360, paddingLeft: 24, paddingRight: 24, left: 0, top: 0, position: 'absolute', background: 'var(--bg-card, #161921)', borderTopLeftRadius: 22, borderTopRightRadius: 22, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
        <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                <div data-property-1="Header2" style={{alignSelf: 'stretch', paddingTop: 24, paddingBottom: 8, justifyContent: 'flex-end', alignItems: 'center', display: 'inline-flex'}}>
                    <div style={{width: 20, height: 20, position: 'relative', overflow: 'hidden'}}>
                        <div style={{width: 11.67, height: 11.67, left: 4.17, top: 4.17, position: 'absolute', background: 'var(--text-secondary, #8B8FA3)'}} />
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingTop: 32, paddingBottom: 8, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'}}>Email address</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>A confirmation link will be sent before your email changes.</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                    <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'}}>Current</div>
                    </div>
                    <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', display: 'flex'}}>
                        <div style={{alignSelf: 'stretch', paddingBottom: 14, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                            <div data-icon="false" data-property-1="Text" data-property-2="Empty" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                                <div style={{flex: '1 1 0', color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>email@email.com</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                    <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'}}>update</div>
                    </div>
                    <div style={{alignSelf: 'stretch', paddingBottom: 14, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                        <div data-icon="false" data-property-1="Text" data-property-2="Empty" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                            <div style={{flex: '1 1 0', color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>New email address</div>
                        </div>
                        <div data-icon="false" data-property-1="Text" data-property-2="Empty" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                            <div style={{flex: '1 1 0', color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>Confirm new email</div>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingTop: 28, paddingBottom: 40, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 12, display: 'flex'}}>
                    <div data-icon="false" data-property-1="Disabled" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 14, paddingBottom: 14, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '500', lineHeight: 19.50, wordWrap: 'break-word'}}>Save</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

Style:
// Email address
color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'
---
// A confirmation link will be sent before your email changes.
color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// Current
color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'
---
// email@email.com
color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// update
color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'
---
// New email address
color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// Confirm new email
color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// Save
color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '500', lineHeight: 19.50, wordWrap: 'break-word'

State 2: 
Code:
<div style={{width: '100%', height: '100%', position: 'relative'}}>
    <div style={{width: 360, paddingLeft: 24, paddingRight: 24, left: 0, top: 0, position: 'absolute', background: 'var(--bg-card, #161921)', borderTopLeftRadius: 22, borderTopRightRadius: 22, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
        <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                <div data-property-1="Header2" style={{alignSelf: 'stretch', paddingTop: 24, paddingBottom: 8, justifyContent: 'flex-end', alignItems: 'center', display: 'inline-flex'}}>
                    <div style={{width: 20, height: 20, position: 'relative', overflow: 'hidden'}}>
                        <div style={{width: 11.67, height: 11.67, left: 4.17, top: 4.17, position: 'absolute', background: 'var(--text-secondary, #8B8FA3)'}} />
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingTop: 32, paddingBottom: 8, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'}}>Email address</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>A confirmation link will be sent before your email changes.</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                    <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'}}>Current</div>
                    </div>
                    <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', display: 'flex'}}>
                        <div style={{alignSelf: 'stretch', paddingBottom: 14, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                            <div data-icon="false" data-property-1="Text" data-property-2="Empty" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                                <div style={{flex: '1 1 0', color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>email@email.com</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                    <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'}}>update</div>
                    </div>
                    <div style={{alignSelf: 'stretch', paddingBottom: 14, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                        <div data-icon="false" data-property-1="Text" data-property-2="Filled" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                            <div style={{flex: '1 1 0', color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>email22@email.com</div>
                        </div>
                        <div data-icon="false" data-property-1="Text" data-property-2="Empty" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                            <div style={{flex: '1 1 0', color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>Confirm new email</div>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingTop: 28, paddingBottom: 40, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 12, display: 'flex'}}>
                    <div data-icon="false" data-property-1="Disabled" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 14, paddingBottom: 14, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '500', lineHeight: 19.50, wordWrap: 'break-word'}}>Save</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

Style:
// Email address
color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'
---
// A confirmation link will be sent before your email changes.
color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// Current
color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'
---
// email@email.com
color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// update
color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'
---
// email22@email.com
color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// Confirm new email
color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// Save
color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '500', lineHeight: 19.50, wordWrap: 'break-word'

State 3:
Code:
<div style={{width: '100%', height: '100%', position: 'relative'}}>
    <div style={{width: 360, paddingLeft: 24, paddingRight: 24, left: 0, top: 0, position: 'absolute', background: 'var(--bg-card, #161921)', borderTopLeftRadius: 22, borderTopRightRadius: 22, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
        <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                <div data-property-1="Header2" style={{alignSelf: 'stretch', paddingTop: 24, paddingBottom: 8, justifyContent: 'flex-end', alignItems: 'center', display: 'inline-flex'}}>
                    <div style={{width: 20, height: 20, position: 'relative', overflow: 'hidden'}}>
                        <div style={{width: 11.67, height: 11.67, left: 4.17, top: 4.17, position: 'absolute', background: 'var(--text-secondary, #8B8FA3)'}} />
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingTop: 32, paddingBottom: 8, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'}}>Email address</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>A confirmation link will be sent before your email changes.</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                    <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'}}>Current</div>
                    </div>
                    <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', display: 'flex'}}>
                        <div style={{alignSelf: 'stretch', paddingBottom: 14, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                            <div data-icon="false" data-property-1="Text" data-property-2="Empty" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                                <div style={{flex: '1 1 0', color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>email@email.com</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                    <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'}}>update</div>
                    </div>
                    <div style={{alignSelf: 'stretch', paddingBottom: 14, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                        <div data-icon="false" data-property-1="Text" data-property-2="Filled" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                            <div style={{flex: '1 1 0', color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>email22@email.com</div>
                        </div>
                        <div data-icon="true" data-property-1="Text" data-property-2="Filled" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                            <div style={{flex: '1 1 0', color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>emai</div>
                            <div style={{width: 16, height: 16, position: 'relative', overflow: 'hidden'}}>
                                <div style={{width: 12, height: 12, left: 2, top: 2, position: 'absolute', outline: '1.20px var(--status-misaligned, #D47B7B) solid', outlineOffset: '-0.60px'}} />
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingTop: 28, paddingBottom: 40, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 12, display: 'flex'}}>
                    <div data-icon="false" data-property-1="Disabled" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 14, paddingBottom: 14, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '500', lineHeight: 19.50, wordWrap: 'break-word'}}>Save</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

Style:
// Email address
color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'
---
// A confirmation link will be sent before your email changes.
color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// Current
color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'
---
// email@email.com
color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// update
color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'
---
// email22@email.com
color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// emai
color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// Save
color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '500', lineHeight: 19.50, wordWrap: 'break-word'

State 4:
Code:
<div style={{width: '100%', height: '100%', position: 'relative'}}>
    <div style={{width: 360, paddingLeft: 24, paddingRight: 24, left: 0, top: 0, position: 'absolute', background: 'var(--bg-card, #161921)', borderTopLeftRadius: 22, borderTopRightRadius: 22, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
        <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                <div data-property-1="Header2" style={{alignSelf: 'stretch', paddingTop: 24, paddingBottom: 8, justifyContent: 'flex-end', alignItems: 'center', display: 'inline-flex'}}>
                    <div style={{width: 20, height: 20, position: 'relative', overflow: 'hidden'}}>
                        <div style={{width: 11.67, height: 11.67, left: 4.17, top: 4.17, position: 'absolute', background: 'var(--text-secondary, #8B8FA3)'}} />
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingTop: 32, paddingBottom: 8, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'}}>Email address</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>A confirmation link will be sent before your email changes.</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                    <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'}}>Current</div>
                    </div>
                    <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', display: 'flex'}}>
                        <div style={{alignSelf: 'stretch', paddingBottom: 14, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                            <div data-icon="false" data-property-1="Text" data-property-2="Empty" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                                <div style={{flex: '1 1 0', color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>email@email.com</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                    <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'}}>update</div>
                    </div>
                    <div style={{alignSelf: 'stretch', paddingBottom: 14, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                        <div data-icon="false" data-property-1="Text" data-property-2="Filled" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                            <div style={{flex: '1 1 0', color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>email22@email.com</div>
                        </div>
                        <div data-icon="true" data-property-1="Text" data-property-2="Filled" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                            <div style={{flex: '1 1 0', color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>email22@email.com</div>
                            <div style={{width: 16, height: 16, position: 'relative', overflow: 'hidden'}}>
                                <div style={{width: 12, height: 12, left: 2, top: 2, position: 'absolute', outline: '1.20px var(--accent, #10B981) solid', outlineOffset: '-0.60px'}} />
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingTop: 28, paddingBottom: 40, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 12, display: 'flex'}}>
                    <div data-icon="false" data-property-1="Primary" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 14, paddingBottom: 14, background: 'var(--accent, #10B981)', borderRadius: 14, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                        <div style={{color: 'var(--bg, #0D0F14)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '500', lineHeight: 19.50, wordWrap: 'break-word'}}>Save</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

Style:
// Email address
color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'
---
// A confirmation link will be sent before your email changes.
color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// Current
color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'
---
// email@email.com
color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// update
color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'
---
// email22@email.com
color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// email22@email.com
color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// Save
color: 'var(--bg, #0D0F14)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '500', lineHeight: 19.50, wordWrap: 'break-word'

—

State 5:
Code:
<div style={{width: '100%', height: '100%', position: 'relative'}}>
    <div style={{width: 360, paddingLeft: 24, paddingRight: 24, left: 0, top: 0, position: 'absolute', background: 'var(--bg-card, #161921)', borderTopLeftRadius: 22, borderTopRightRadius: 22, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
        <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                <div style={{alignSelf: 'stretch', paddingTop: 24, paddingBottom: 8, justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
                    <div style={{width: 20, height: 20, position: 'relative', overflow: 'hidden'}}>
                        <div style={{width: 11.67, height: 6.67, left: 4.17, top: 6.67, position: 'absolute', outline: '2px var(--text-secondary, #8B8FA3) solid', outlineOffset: '-1px'}} />
                    </div>
                    <div style={{width: 20, height: 20, position: 'relative', overflow: 'hidden'}}>
                        <div style={{width: 11.67, height: 11.67, left: 4.17, top: 4.17, position: 'absolute', background: 'var(--text-secondary, #8B8FA3)'}} />
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingTop: 32, paddingBottom: 8, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'}}>We sent a confirmation link to email22@email.com</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>Check your email to confirm your account. Then sign in to finish saving your journey.</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingTop: 28, paddingBottom: 40, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 12, display: 'flex'}}>
                    <div data-icon="false" data-property-1="Outline" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 14, paddingBottom: 14, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '500', lineHeight: 19.50, wordWrap: 'break-word'}}>Resend email confirmation</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

Style:
// We sent a confirmation link to email22@email.com
color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'
---
// Check your email to confirm your account. Then sign in to finish saving your journey.
color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// Resend email confirmation
color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '500', lineHeight: 19.50, wordWrap: 'break-word'

—

State 6:
Code:
<div style={{width: '100%', height: '100%', position: 'relative'}}>
    <div style={{width: 360, paddingLeft: 24, paddingRight: 24, left: 0, top: 0, position: 'absolute', background: 'var(--bg-card, #161921)', borderTopLeftRadius: 22, borderTopRightRadius: 22, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
        <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                <div data-property-1="Header2" style={{alignSelf: 'stretch', paddingTop: 24, paddingBottom: 8, justifyContent: 'flex-end', alignItems: 'center', display: 'inline-flex'}}>
                    <div style={{width: 20, height: 20, position: 'relative', overflow: 'hidden'}}>
                        <div style={{width: 11.67, height: 11.67, left: 4.17, top: 4.17, position: 'absolute', background: 'var(--text-secondary, #8B8FA3)'}} />
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingTop: 32, paddingBottom: 8, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'}}>Email address</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>A confirmation link will be sent before your email changes.</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                    <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'}}>Current</div>
                    </div>
                    <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', display: 'flex'}}>
                        <div style={{alignSelf: 'stretch', paddingBottom: 14, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                            <div data-icon="false" data-property-1="Text" data-property-2="Empty" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                                <div style={{flex: '1 1 0', color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>email@email.com</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                    <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'}}>update</div>
                    </div>
                    <div style={{alignSelf: 'stretch', paddingBottom: 14, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                        <div data-icon="false" data-property-1="Text" data-property-2="Filled" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                            <div style={{flex: '1 1 0', color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>email22@email.com</div>
                        </div>
                        <div data-icon="true" data-property-1="Text" data-property-2="Filled" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                            <div style={{flex: '1 1 0', color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>email22@email.com</div>
                            <div style={{width: 16, height: 16, position: 'relative', overflow: 'hidden'}}>
                                <div style={{width: 12, height: 12, left: 2, top: 2, position: 'absolute', outline: '1.20px var(--accent, #10B981) solid', outlineOffset: '-0.60px'}} />
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingTop: 28, paddingBottom: 40, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 12, display: 'flex'}}>
                    <div data-icon="false" data-property-1="Primary" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 14, paddingBottom: 14, background: 'var(--accent, #10B981)', borderRadius: 14, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                        <div style={{color: 'var(--bg, #0D0F14)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '500', lineHeight: 19.50, wordWrap: 'break-word'}}>Confirm email</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

Style:
// Email address
color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'
---
// A confirmation link will be sent before your email changes.
color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// Current
color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'
---
// email@email.com
color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// update
color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'
---
// email22@email.com
color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// email22@email.com
color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// Confirm email
color: 'var(--bg, #0D0F14)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '500', lineHeight: 19.50, wordWrap: 'break-word'


--

Password drawer

State 1:
Code:
<div style={{width: '100%', height: '100%', position: 'relative'}}>
    <div style={{width: 360, paddingLeft: 24, paddingRight: 24, left: 0, top: 0, position: 'absolute', background: 'var(--bg-card, #161921)', borderTopLeftRadius: 22, borderTopRightRadius: 22, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
        <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                <div data-property-1="Header2" style={{alignSelf: 'stretch', paddingTop: 24, paddingBottom: 8, justifyContent: 'flex-end', alignItems: 'center', display: 'inline-flex'}}>
                    <div style={{width: 20, height: 20, position: 'relative', overflow: 'hidden'}}>
                        <div style={{width: 11.67, height: 11.67, left: 4.17, top: 4.17, position: 'absolute', background: 'var(--text-secondary, #8B8FA3)'}} />
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingTop: 32, paddingBottom: 8, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'}}>Password</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>Keep your account secure with a strong, unique password.</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                    <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'}}>Current</div>
                    </div>
                    <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', display: 'flex'}}>
                        <div style={{alignSelf: 'stretch', paddingBottom: 14, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                            <div data-icon="true" data-property-1="Text" data-property-2="Filled" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                                <div style={{flex: '1 1 0', color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>******</div>
                                <div style={{width: 16, height: 16, position: 'relative', overflow: 'hidden'}}>
                                    <div style={{width: 12, height: 8, left: 2, top: 4, position: 'absolute', outline: '1.20px var(--text-muted, #7D8093) solid', outlineOffset: '-0.60px'}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                    <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'}}>update</div>
                    </div>
                    <div style={{alignSelf: 'stretch', paddingBottom: 14, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                        <div data-icon="false" data-property-1="Text" data-property-2="Empty" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                            <div style={{flex: '1 1 0', color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>New password</div>
                        </div>
                        <div data-icon="false" data-property-1="Text" data-property-2="Empty" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                            <div style={{flex: '1 1 0', color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>Confirm new password</div>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingTop: 28, paddingBottom: 40, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 12, display: 'flex'}}>
                    <div data-icon="false" data-property-1="Disabled" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 14, paddingBottom: 14, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '500', lineHeight: 19.50, wordWrap: 'break-word'}}>Save</div>
                    </div>
                    <div data-icon="false" data-property-1="Text" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 4, paddingBottom: 4, borderRadius: 14, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', textDecoration: 'underline', lineHeight: 19.50, wordWrap: 'break-word'}}>Forgot password?</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

Style:
// Password
color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'
---
// Keep your account secure with a strong, unique password.
color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// Current
color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'
---
// ******
color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// update
color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'
---
// New password
color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// Confirm new password
color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// Save
color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '500', lineHeight: 19.50, wordWrap: 'break-word'
---
// Forgot password?
color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', textDecoration: 'underline', lineHeight: 19.50, wordWrap: 'break-word'

—

State 2:
Code:
<div style={{width: '100%', height: '100%', position: 'relative'}}>
    <div style={{width: 360, paddingLeft: 24, paddingRight: 24, left: 0, top: 0, position: 'absolute', background: 'var(--bg-card, #161921)', borderTopLeftRadius: 22, borderTopRightRadius: 22, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
        <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                <div data-property-1="Header2" style={{alignSelf: 'stretch', paddingTop: 24, paddingBottom: 8, justifyContent: 'flex-end', alignItems: 'center', display: 'inline-flex'}}>
                    <div style={{width: 20, height: 20, position: 'relative', overflow: 'hidden'}}>
                        <div style={{width: 11.67, height: 11.67, left: 4.17, top: 4.17, position: 'absolute', background: 'var(--text-secondary, #8B8FA3)'}} />
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingTop: 32, paddingBottom: 8, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'}}>Password</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>Keep your account secure with a strong, unique password.</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                    <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'}}>Current</div>
                    </div>
                    <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', display: 'flex'}}>
                        <div style={{alignSelf: 'stretch', paddingBottom: 14, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                            <div data-icon="true" data-property-1="Text" data-property-2="Filled" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                                <div style={{flex: '1 1 0', color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>123456</div>
                                <div style={{width: 16, height: 16, position: 'relative', overflow: 'hidden'}}>
                                    <div style={{width: 12, height: 9.33, left: 2, top: 3.33, position: 'absolute', outline: '1.20px var(--text-muted, #7D8093) solid', outlineOffset: '-0.60px'}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                    <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'}}>update</div>
                    </div>
                    <div style={{alignSelf: 'stretch', paddingBottom: 14, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                        <div data-icon="false" data-property-1="Text" data-property-2="Empty" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                            <div style={{flex: '1 1 0', color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>New password</div>
                        </div>
                        <div data-icon="false" data-property-1="Text" data-property-2="Empty" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                            <div style={{flex: '1 1 0', color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>Confirm new password</div>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingTop: 28, paddingBottom: 40, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 12, display: 'flex'}}>
                    <div data-icon="false" data-property-1="Disabled" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 14, paddingBottom: 14, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '500', lineHeight: 19.50, wordWrap: 'break-word'}}>Save</div>
                    </div>
                    <div data-icon="false" data-property-1="Text" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 4, paddingBottom: 4, borderRadius: 14, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', textDecoration: 'underline', lineHeight: 19.50, wordWrap: 'break-word'}}>Forgot password?</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

Style:
// Password
color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'
---
// Keep your account secure with a strong, unique password.
color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// Current
color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'
---
// 123456
color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// update
color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'
---
// New password
color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// Confirm new password
color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// Save
color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '500', lineHeight: 19.50, wordWrap: 'break-word'
---
// Forgot password?
color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', textDecoration: 'underline', lineHeight: 19.50, wordWrap: 'break-word'

—

State 3:
Code:
<div style={{width: '100%', height: '100%', position: 'relative'}}>
    <div style={{width: 360, paddingLeft: 24, paddingRight: 24, left: 0, top: 0, position: 'absolute', background: 'var(--bg-card, #161921)', borderTopLeftRadius: 22, borderTopRightRadius: 22, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
        <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                <div data-property-1="Header2" style={{alignSelf: 'stretch', paddingTop: 24, paddingBottom: 8, justifyContent: 'flex-end', alignItems: 'center', display: 'inline-flex'}}>
                    <div style={{width: 20, height: 20, position: 'relative', overflow: 'hidden'}}>
                        <div style={{width: 11.67, height: 11.67, left: 4.17, top: 4.17, position: 'absolute', background: 'var(--text-secondary, #8B8FA3)'}} />
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingTop: 32, paddingBottom: 8, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'}}>Password</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>Keep your account secure with a strong, unique password.</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                    <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'}}>Current</div>
                    </div>
                    <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', display: 'flex'}}>
                        <div style={{alignSelf: 'stretch', paddingBottom: 14, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                            <div data-icon="true" data-property-1="Text" data-property-2="Empty" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                                <div style={{flex: '1 1 0', color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>******</div>
                                <div style={{width: 16, height: 16, position: 'relative', overflow: 'hidden'}}>
                                    <div style={{width: 12, height: 8, left: 2, top: 4, position: 'absolute', outline: '1.20px var(--text-muted, #7D8093) solid', outlineOffset: '-0.60px'}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                    <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'}}>update</div>
                    </div>
                    <div style={{alignSelf: 'stretch', paddingBottom: 14, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                        <div data-icon="true" data-property-1="Text" data-property-2="Filled" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                            <div style={{flex: '1 1 0', color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>****</div>
                            <div style={{width: 16, height: 16, position: 'relative', overflow: 'hidden'}}>
                                <div style={{width: 12, height: 8, left: 2, top: 4, position: 'absolute', outline: '1.20px var(--text-muted, #7D8093) solid', outlineOffset: '-0.60px'}} />
                            </div>
                        </div>
                        <div data-icon-left="true" data-icon-right="false" data-property-1="Static" style={{alignSelf: 'stretch', paddingLeft: 12, paddingRight: 12, paddingTop: 4, paddingBottom: 4, borderRadius: 22, justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'inline-flex'}}>
                            <div style={{width: 16, height: 16, position: 'relative', overflow: 'hidden'}}>
                                <div style={{width: 12, height: 12, left: 2, top: 2, position: 'absolute', outline: '1px var(--text-secondary, #8B8FA3) solid', outlineOffset: '-0.50px'}} />
                            </div>
                            <div style={{color: 'var(--text-secondary, #8B8FA3)', fontSize: 11, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 16.50, wordWrap: 'break-word'}}>At least 6 characters</div>
                        </div>
                        <div data-icon="false" data-property-1="Text" data-property-2="Empty" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                            <div style={{flex: '1 1 0', color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>Confirm new password</div>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingTop: 28, paddingBottom: 40, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 12, display: 'flex'}}>
                    <div data-icon="false" data-property-1="Disabled" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 14, paddingBottom: 14, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '500', lineHeight: 19.50, wordWrap: 'break-word'}}>Save</div>
                    </div>
                    <div data-icon="false" data-property-1="Text" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 4, paddingBottom: 4, borderRadius: 14, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', textDecoration: 'underline', lineHeight: 19.50, wordWrap: 'break-word'}}>Forgot password?</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

Style:
// Password
color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'
---
// Keep your account secure with a strong, unique password.
color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// Current
color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'
---
// ******
color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// update
color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'
---
// ****
color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// At least 6 characters
color: 'var(--text-secondary, #8B8FA3)', fontSize: 11, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 16.50, wordWrap: 'break-word'
---
// Confirm new password
color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// Save
color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '500', lineHeight: 19.50, wordWrap: 'break-word'
---
// Forgot password?
color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', textDecoration: 'underline', lineHeight: 19.50, wordWrap: 'break-word'

—

State 4:
Code:
<div style={{width: '100%', height: '100%', position: 'relative'}}>
    <div style={{width: 360, paddingLeft: 24, paddingRight: 24, left: 0, top: 0, position: 'absolute', background: 'var(--bg-card, #161921)', borderTopLeftRadius: 22, borderTopRightRadius: 22, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
        <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                <div data-property-1="Header2" style={{alignSelf: 'stretch', paddingTop: 24, paddingBottom: 8, justifyContent: 'flex-end', alignItems: 'center', display: 'inline-flex'}}>
                    <div style={{width: 20, height: 20, position: 'relative', overflow: 'hidden'}}>
                        <div style={{width: 11.67, height: 11.67, left: 4.17, top: 4.17, position: 'absolute', background: 'var(--text-secondary, #8B8FA3)'}} />
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingTop: 32, paddingBottom: 8, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'}}>Password</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>Keep your account secure with a strong, unique password.</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                    <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'}}>Current</div>
                    </div>
                    <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', display: 'flex'}}>
                        <div style={{alignSelf: 'stretch', paddingBottom: 14, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                            <div data-icon="true" data-property-1="Text" data-property-2="Empty" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                                <div style={{flex: '1 1 0', color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>******</div>
                                <div style={{width: 16, height: 16, position: 'relative', overflow: 'hidden'}}>
                                    <div style={{width: 12, height: 8, left: 2, top: 4, position: 'absolute', outline: '1.20px var(--text-muted, #7D8093) solid', outlineOffset: '-0.60px'}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                    <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'}}>update</div>
                    </div>
                    <div style={{alignSelf: 'stretch', paddingBottom: 14, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                        <div data-icon="true" data-property-1="Text" data-property-2="Filled" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                            <div style={{flex: '1 1 0', color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>********</div>
                            <div style={{width: 16, height: 16, position: 'relative', overflow: 'hidden'}}>
                                <div style={{width: 12, height: 8, left: 2, top: 4, position: 'absolute', outline: '1.20px var(--text-muted, #7D8093) solid', outlineOffset: '-0.60px'}} />
                            </div>
                        </div>
                        <div data-icon-left="true" data-icon-right="false" data-property-1="Static" style={{alignSelf: 'stretch', paddingLeft: 12, paddingRight: 12, paddingTop: 4, paddingBottom: 4, borderRadius: 22, justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'inline-flex'}}>
                            <div style={{width: 16, height: 16, position: 'relative', overflow: 'hidden'}}>
                                <div style={{width: 12, height: 12, left: 2, top: 2, position: 'absolute', outline: '1px var(--accent, #10B981) solid', outlineOffset: '-0.50px'}} />
                            </div>
                            <div style={{color: 'var(--accent, #10B981)', fontSize: 11, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 16.50, wordWrap: 'break-word'}}>At least 6 characters</div>
                        </div>
                        <div data-icon="false" data-property-1="Text" data-property-2="Empty" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                            <div style={{flex: '1 1 0', color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>Confirm new password</div>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingTop: 28, paddingBottom: 40, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 12, display: 'flex'}}>
                    <div data-icon="false" data-property-1="Disabled" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 14, paddingBottom: 14, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '500', lineHeight: 19.50, wordWrap: 'break-word'}}>Save</div>
                    </div>
                    <div data-icon="false" data-property-1="Text" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 4, paddingBottom: 4, borderRadius: 14, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', textDecoration: 'underline', lineHeight: 19.50, wordWrap: 'break-word'}}>Forgot password?</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

Style:
// Password
color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'
---
// Keep your account secure with a strong, unique password.
color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// Current
color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'
---
// ******
color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// update
color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'
---
// ********
color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// At least 6 characters
color: 'var(--accent, #10B981)', fontSize: 11, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 16.50, wordWrap: 'break-word'
---
// Confirm new password
color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// Save
color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '500', lineHeight: 19.50, wordWrap: 'break-word'
---
// Forgot password?
color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', textDecoration: 'underline', lineHeight: 19.50, wordWrap: 'break-word'

—

State 5:
Code:
<div style={{width: '100%', height: '100%', position: 'relative'}}>
    <div style={{width: 360, paddingLeft: 24, paddingRight: 24, left: 0, top: 0, position: 'absolute', background: 'var(--bg-card, #161921)', borderTopLeftRadius: 22, borderTopRightRadius: 22, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
        <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                <div data-property-1="Header2" style={{alignSelf: 'stretch', paddingTop: 24, paddingBottom: 8, justifyContent: 'flex-end', alignItems: 'center', display: 'inline-flex'}}>
                    <div style={{width: 20, height: 20, position: 'relative', overflow: 'hidden'}}>
                        <div style={{width: 11.67, height: 11.67, left: 4.17, top: 4.17, position: 'absolute', background: 'var(--text-secondary, #8B8FA3)'}} />
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingTop: 32, paddingBottom: 8, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'}}>Password</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>Keep your account secure with a strong, unique password.</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                    <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'}}>Current</div>
                    </div>
                    <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', display: 'flex'}}>
                        <div style={{alignSelf: 'stretch', paddingBottom: 14, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                            <div data-icon="true" data-property-1="Text" data-property-2="Empty" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                                <div style={{flex: '1 1 0', color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>******</div>
                                <div style={{width: 16, height: 16, position: 'relative', overflow: 'hidden'}}>
                                    <div style={{width: 12, height: 8, left: 2, top: 4, position: 'absolute', outline: '1.20px var(--text-muted, #7D8093) solid', outlineOffset: '-0.60px'}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                    <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'}}>update</div>
                    </div>
                    <div style={{alignSelf: 'stretch', paddingBottom: 14, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                        <div data-icon="true" data-property-1="Text" data-property-2="Filled" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                            <div style={{flex: '1 1 0', color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>********</div>
                            <div style={{width: 16, height: 16, position: 'relative', overflow: 'hidden'}}>
                                <div style={{width: 12, height: 8, left: 2, top: 4, position: 'absolute', outline: '1.20px var(--text-muted, #7D8093) solid', outlineOffset: '-0.60px'}} />
                            </div>
                        </div>
                        <div data-icon="true" data-property-1="Text" data-property-2="Filled" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                            <div style={{flex: '1 1 0', color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>***</div>
                            <div style={{width: 16, height: 16, position: 'relative', overflow: 'hidden'}}>
                                <div style={{width: 12, height: 12, left: 2, top: 2, position: 'absolute', outline: '1.20px var(--status-misaligned, #D47B7B) solid', outlineOffset: '-0.60px'}} />
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingTop: 28, paddingBottom: 40, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 12, display: 'flex'}}>
                    <div data-icon="false" data-property-1="Disabled" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 14, paddingBottom: 14, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '500', lineHeight: 19.50, wordWrap: 'break-word'}}>Save</div>
                    </div>
                    <div data-icon="false" data-property-1="Text" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 4, paddingBottom: 4, borderRadius: 14, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', textDecoration: 'underline', lineHeight: 19.50, wordWrap: 'break-word'}}>Forgot password?</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

Style:
// Password
color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'
---
// Keep your account secure with a strong, unique password.
color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// Current
color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'
---
// ******
color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// update
color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'
---
// ********
color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// ***
color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// Save
color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '500', lineHeight: 19.50, wordWrap: 'break-word'
---
// Forgot password?
color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', textDecoration: 'underline', lineHeight: 19.50, wordWrap: 'break-word'

—

State 6:
Code:
<div style={{width: '100%', height: '100%', position: 'relative'}}>
    <div style={{width: 360, paddingLeft: 24, paddingRight: 24, left: 0, top: 0, position: 'absolute', background: 'var(--bg-card, #161921)', borderTopLeftRadius: 22, borderTopRightRadius: 22, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
        <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                <div data-property-1="Header2" style={{alignSelf: 'stretch', paddingTop: 24, paddingBottom: 8, justifyContent: 'flex-end', alignItems: 'center', display: 'inline-flex'}}>
                    <div style={{width: 20, height: 20, position: 'relative', overflow: 'hidden'}}>
                        <div style={{width: 11.67, height: 11.67, left: 4.17, top: 4.17, position: 'absolute', background: 'var(--text-secondary, #8B8FA3)'}} />
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingTop: 32, paddingBottom: 8, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'}}>Password</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>Keep your account secure with a strong, unique password.</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                    <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'}}>Current</div>
                    </div>
                    <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', display: 'flex'}}>
                        <div style={{alignSelf: 'stretch', paddingBottom: 14, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                            <div data-icon="true" data-property-1="Text" data-property-2="Empty" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                                <div style={{flex: '1 1 0', color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>******</div>
                                <div style={{width: 16, height: 16, position: 'relative', overflow: 'hidden'}}>
                                    <div style={{width: 12, height: 8, left: 2, top: 4, position: 'absolute', outline: '1.20px var(--text-muted, #7D8093) solid', outlineOffset: '-0.60px'}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                    <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'}}>update</div>
                    </div>
                    <div style={{alignSelf: 'stretch', paddingBottom: 14, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                        <div data-icon="true" data-property-1="Text" data-property-2="Filled" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                            <div style={{flex: '1 1 0', color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>********</div>
                            <div style={{width: 16, height: 16, position: 'relative', overflow: 'hidden'}}>
                                <div style={{width: 12, height: 8, left: 2, top: 4, position: 'absolute', outline: '1.20px var(--text-muted, #7D8093) solid', outlineOffset: '-0.60px'}} />
                            </div>
                        </div>
                        <div data-icon="true" data-property-1="Text" data-property-2="Filled" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                            <div style={{flex: '1 1 0', color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>********</div>
                            <div style={{width: 16, height: 16, position: 'relative', overflow: 'hidden'}}>
                                <div style={{width: 12, height: 12, left: 2, top: 2, position: 'absolute', outline: '1.20px var(--accent, #10B981) solid', outlineOffset: '-0.60px'}} />
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingTop: 28, paddingBottom: 40, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 12, display: 'flex'}}>
                    <div data-icon="false" data-property-1="Primary" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 14, paddingBottom: 14, background: 'var(--accent, #10B981)', borderRadius: 14, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                        <div style={{color: 'var(--bg, #0D0F14)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '500', lineHeight: 19.50, wordWrap: 'break-word'}}>Save</div>
                    </div>
                    <div data-icon="false" data-property-1="Text" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 4, paddingBottom: 4, borderRadius: 14, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', textDecoration: 'underline', lineHeight: 19.50, wordWrap: 'break-word'}}>Forgot password?</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

Style:
// Password
color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'
---
// Keep your account secure with a strong, unique password.
color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// Current
color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'
---
// ******
color: 'var(--text-muted, #7D8093)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// update
color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'
---
// ********
color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// ********
color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// Save
color: 'var(--bg, #0D0F14)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '500', lineHeight: 19.50, wordWrap: 'break-word'
---
// Forgot password?
color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', textDecoration: 'underline', lineHeight: 19.50, wordWrap: 'break-word'

--

Theme drawer 
Code:
<div style={{width: '100%', height: '100%', position: 'relative'}}>
    <div style={{width: 360, paddingLeft: 24, paddingRight: 24, left: 0, top: 0, position: 'absolute', background: 'var(--bg-card, #161921)', borderTopLeftRadius: 22, borderTopRightRadius: 22, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
        <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                <div data-property-1="Header2" style={{alignSelf: 'stretch', paddingTop: 24, paddingBottom: 8, justifyContent: 'flex-end', alignItems: 'center', display: 'inline-flex'}}>
                    <div style={{width: 20, height: 20, position: 'relative', overflow: 'hidden'}}>
                        <div style={{width: 11.67, height: 11.67, left: 4.17, top: 4.17, position: 'absolute', background: 'var(--text-secondary, #8B8FA3)'}} />
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingTop: 32, paddingBottom: 8, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'}}>Appearance</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>Choose how the app looks on this device.</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 48, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                    <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'}}>theme</div>
                    </div>
                    <div style={{alignSelf: 'stretch', paddingBottom: 14, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                        <div data-icon="true" data-property-1="Text" data-property-2="Empty" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--accent, #10B981) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                            <div style={{flex: '1 1 0', color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>Dark</div>
                            <div style={{width: 16, height: 16, position: 'relative', overflow: 'hidden'}}>
                                <div style={{width: 9.33, height: 6, left: 3.33, top: 5, position: 'absolute', outline: '1.20px var(--accent, #10B981) solid', outlineOffset: '-0.60px'}} />
                            </div>
                        </div>
                        <div data-icon="false" data-property-1="Text" data-property-2="Empty" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                            <div style={{flex: '1 1 0', color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>Light</div>
                        </div>
                        <div data-icon="false" data-property-1="Text" data-property-2="Empty" style={{alignSelf: 'stretch', padding: 16, background: 'var(--bg-input, #1C1F2A)', borderRadius: 14, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                            <div style={{flex: '1 1 0', color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>System</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

Style:
// Appearance
color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'
---
// Choose how the app looks on this device.
color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// theme
color: 'var(--text-muted, #7D8093)', fontSize: 10, fontFamily: 'DM Sans', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12, wordWrap: 'break-word'
---
// Dark
color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// Light
color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// System
color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'

—

Sign Out drawer

Code:
<div style={{width: '100%', height: '100%', position: 'relative'}}>
    <div style={{width: 360, paddingLeft: 24, paddingRight: 24, left: 0, top: 0, position: 'absolute', background: 'var(--bg-card, #161921)', borderTopLeftRadius: 22, borderTopRightRadius: 22, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
        <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                <div data-property-1="Header2" style={{alignSelf: 'stretch', paddingTop: 24, paddingBottom: 8, justifyContent: 'flex-end', alignItems: 'center', display: 'inline-flex'}}>
                    <div style={{width: 20, height: 20, position: 'relative', overflow: 'hidden'}}>
                        <div style={{width: 11.67, height: 11.67, left: 4.17, top: 4.17, position: 'absolute', background: 'var(--text-secondary, #8B8FA3)'}} />
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingTop: 32, paddingBottom: 8, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'}}>Sign out?</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>You&apos;ll need to sign in again to access your progress.</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingTop: 28, paddingBottom: 40, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 12, display: 'flex'}}>
                    <div data-icon="false" data-property-1="Primary" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 14, paddingBottom: 14, background: 'var(--accent, #10B981)', borderRadius: 14, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                        <div style={{color: 'var(--bg, #0D0F14)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '500', lineHeight: 19.50, wordWrap: 'break-word'}}>Sign out</div>
                    </div>
                    <div data-icon="false" data-property-1="Text" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 4, paddingBottom: 4, borderRadius: 14, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>Cancel</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

Style:
// Sign out?
color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'
---
// You&apos;ll need to sign in again to access your progress.
color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// Sign out
color: 'var(--bg, #0D0F14)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '500', lineHeight: 19.50, wordWrap: 'break-word'
---
// Cancel
color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'

--

Delete Account drawer

Code:
<div style={{width: '100%', height: '100%', position: 'relative'}}>
    <div style={{width: 360, paddingLeft: 24, paddingRight: 24, left: 0, top: 0, position: 'absolute', background: 'var(--bg-card, #161921)', borderTopLeftRadius: 22, borderTopRightRadius: 22, outline: '1px var(--border, #2A2D3A) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
        <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                <div data-property-1="Header2" style={{alignSelf: 'stretch', paddingTop: 24, paddingBottom: 8, justifyContent: 'flex-end', alignItems: 'center', display: 'inline-flex'}}>
                    <div style={{width: 20, height: 20, position: 'relative', overflow: 'hidden'}}>
                        <div style={{width: 11.67, height: 11.67, left: 4.17, top: 4.17, position: 'absolute', background: 'var(--text-secondary, #8B8FA3)'}} />
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingTop: 32, paddingBottom: 8, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'}}>Delete your account?</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingBottom: 20, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>This action cannot be undone. All your progress will be permanently removed.</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingTop: 28, paddingBottom: 40, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 12, display: 'flex'}}>
                    <div data-icon="false" data-property-1="Primary" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 14, paddingBottom: 14, background: 'var(--status-misaligned, #D47B7B)', borderRadius: 14, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                        <div style={{color: 'var(--bg, #0D0F14)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '500', lineHeight: 19.50, wordWrap: 'break-word'}}>Delete account</div>
                    </div>
                    <div data-icon="false" data-property-1="Text" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 4, paddingBottom: 4, borderRadius: 14, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                        <div style={{color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'}}>Cancel</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

Style:
// Delete your account?
color: 'var(--text-primary, #F0F0F5)', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', lineHeight: 28.60, wordWrap: 'break-word'
---
// This action cannot be undone. All your progress will be permanently removed.
color: 'var(--text-secondary, #8B8FA3)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'
---
// Delete account
color: 'var(--bg, #0D0F14)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '500', lineHeight: 19.50, wordWrap: 'break-word'
---
// Cancel
color: 'var(--text-primary, #F0F0F5)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: '400', lineHeight: 19.50, wordWrap: 'break-word'

--

Drawer animation behavior:

Drawer — Enter Sheet slides up from bottom using cubic-bezier(0.16, 1, 0.3, 1) (spring/overshoot), duration 260ms. Backdrop fades in from opacity: 0 → 1 over 180ms with a standard ease curve. Both play simultaneously on mount.

Drawer — Exit (× button, backdrop tap, or post-save)
Sheet slides down using cubic-bezier(0.4, 0, 1, 1) (ease-in, accelerates away), duration 280ms. Backdrop fades out from opacity: 1 → 0 over the same 280ms. Both play simultaneously. Component unmounts after the 280ms completes.

Save button — on tap
Background transitions from #10B981 (accent) to #1A2421 (accent-soft) over 250ms. Text color transitions from dark to #10B981 (accent) over 200ms. A 1px solid #10B98133 border fades in over 250ms. A 14×14px checkmark SVG appears inline to the left of the label, which changes from "Save" to "Saved". These are CSS transition properties (not keyframe animations), so they interpolate smoothly on the element in place.

Post-save timing sequence
0ms — Save tapped, button begins transition to accent-soft
250ms — Button fully settled at #1A2421 bg, #10B981 text, "Saved ✓" visible
1200ms — close() fires, drawer begins exit animation
1480ms — Drawer fully offscreen, component unmounts, updated value visible in card row behind.

Exit curve rationale
Enter uses a spring curve so the sheet feels like it arrives with energy. Exit uses ease-in so it accelerates away — the asymmetry makes the dismiss feel intentional and snappy rather than mirroring the entrance.

