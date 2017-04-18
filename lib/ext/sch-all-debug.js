/*

Ext Scheduler 2.2.9
Copyright(c) 2009-2013 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/license

*/

Ext.define("Sch.locale.Locale", {
	l10n: null,
	legacyMode: true,
	constructor: function() {
		if (!Sch.locale.Active) {
			Sch.locale.Active = {};
			this.bindRequire()
		}
		var a = this.self.getName().split(".");
		a.pop();
		this.namespaceId = a.join(".");
		this.apply()
	},
	bindRequire: function() {
		var a = Ext.ClassManager.triggerCreated;
		Ext.ClassManager.triggerCreated = function(d) {
			a.apply(this, arguments);
			var c = Ext.ClassManager.get(d);
			for (var b in Sch.locale.Active) {
				Sch.locale.Active[b].apply(c)
			}
		}
	},
	apply: function(a) {
		if (this.l10n) {
			var h = this,
			f,
			e;
			var g = this.self.getName();
			var d = function(l, k) {
				k = k || Ext.ClassManager.get(l);
				if (k && (k.activeLocaleId !== g)) {
					var i = h.l10n[l];
					if (typeof i === "function") {
						i(l)
					} else {
						if (k.singleton) {
							k.l10n = Ext.apply(k.l10n || {},
							i)
						} else {
							Ext.override(k, {
								l10n: i
							})
						}
					}
					if (h.legacyMode) {
						var n;
						if (k.prototype) {
							n = k.prototype
						} else {
							if (k.singleton) {
								n = k
							}
						}
						if (n) {
							if (n.legacyHolderProp) {
								if (!n[n.legacyHolderProp]) {
									n[n.legacyHolderProp] = {}
								}
								n = n[n.legacyHolderProp]
							}
							for (var m in i) {
								if (typeof n[m] !== "function") {
									n[m] = i[m]
								}
							}
						}
					}
					k.activeLocaleId = g;
					if (k.onLocalized) {
						k.onLocalized()
					}
				}
			};
			if (a) {
				if (!Ext.isArray(a)) {
					a = [a]
				}
				var b,
				j;
				for (f = 0, e = a.length; f < e; f++) {
					if (Ext.isObject(a[f])) {
						if (a[f].singleton) {
							j = a[f];
							b = Ext.getClassName(Ext.getClass(j))
						} else {
							j = Ext.getClass(a[f]);
							b = Ext.getClassName(j)
						}
					} else {
						j = null;
						b = "string" === typeof a[f] ? a[f] : Ext.getClassName(a[f])
					}
					if (b && b in this.l10n) {
						d(b, j)
					}
				}
			} else {
				Sch.locale.Active[this.namespaceId] = this;
				for (var c in this.l10n) {
					d(c)
				}
			}
		}
	}
});
Ext.define("Sch.locale.En", {
	extend: "Sch.locale.Locale",
	singleton: true,
	l10n: {
		"Sch.util.Date": {
			unitNames: {
				YEAR: {
					single: "year",
					plural: "years",
					abbrev: "yr"
				},
				QUARTER: {
					single: "quarter",
					plural: "quarters",
					abbrev: "q"
				},
				MONTH: {
					single: "month",
					plural: "months",
					abbrev: "mon"
				},
				WEEK: {
					single: "week",
					plural: "weeks",
					abbrev: "w"
				},
				DAY: {
					single: "day",
					plural: "days",
					abbrev: "d"
				},
				HOUR: {
					single: "hour",
					plural: "hours",
					abbrev: "h"
				},
				MINUTE: {
					single: "minute",
					plural: "minutes",
					abbrev: "min"
				},
				SECOND: {
					single: "second",
					plural: "seconds",
					abbrev: "s"
				},
				MILLI: {
					single: "ms",
					plural: "ms",
					abbrev: "ms"
				}
			}
		},
		"Sch.plugin.CurrentTimeLine": {
			tooltipText: "Current time"
		},
		"Sch.plugin.EventEditor": {
			saveText: "Save",
			deleteText: "Delete",
			cancelText: "Cancel"
		},
		"Sch.plugin.SimpleEditor": {
			newEventText: "New booking..."
		},
		"Sch.widget.ExportDialog": {
			generalError: "An error occured, try again.",
			title: "Export Settings",
			formatFieldLabel: "Paper format",
			orientationFieldLabel: "Orientation",
			rangeFieldLabel: "Export range",
			showHeaderLabel: "Add page number",
			orientationPortraitText: "Portrait",
			orientationLandscapeText: "Landscape",
			completeViewText: "Complete schedule",
			currentViewText: "Current view",
			dateRangeText: "Date range",
			dateRangeFromText: "Export from",
			pickerText: "Resize column/rows to desired value",
			dateRangeToText: "Export to",
			exportButtonText: "Export",
			cancelButtonText: "Cancel",
			progressBarText: "Exporting...",
			exportToSingleLabel: "Export as single page",
			adjustCols: "Adjust column width",
			adjustColsAndRows: "Adjust column width and row height",
			specifyDateRange: "Specify date range"
		},
		"Sch.preset.Manager": function() {
			var b = Sch.preset.Manager,
			a = b.getPreset("hourAndDay");
			if (a) {
				a.displayDateFormat = "G:i";
				a.headerConfig.middle.dateFormat = "G:i";
				a.headerConfig.top.dateFormat = "D d/m"
			}
			a = b.getPreset("dayAndWeek");
			if (a) {
				a.displayDateFormat = "m/d h:i A";
				a.headerConfig.middle.dateFormat = "D d M"
			}
			a = b.getPreset("weekAndDay");
			if (a) {
				a.displayDateFormat = "m/d";
				a.headerConfig.bottom.dateFormat = "d M";
				a.headerConfig.middle.dateFormat = "Y F d"
			}
			a = b.getPreset("weekAndMonth");
			if (a) {
				a.displayDateFormat = "m/d/Y";
				a.headerConfig.middle.dateFormat = "m/d";
				a.headerConfig.top.dateFormat = "m/d/Y"
			}
			a = b.getPreset("weekAndDayLetter");
			if (a) {
				a.displayDateFormat = "m/d/Y";
				a.headerConfig.middle.dateFormat = "D d M Y"
			}
			a = b.getPreset("weekDateAndMonth");
			if (a) {
				a.displayDateFormat = "m/d/Y";
				a.headerConfig.middle.dateFormat = "d";
				a.headerConfig.top.dateFormat = "Y F"
			}
			a = b.getPreset("monthAndYear");
			if (a) {
				a.displayDateFormat = "m/d/Y";
				a.headerConfig.middle.dateFormat = "M Y";
				a.headerConfig.top.dateFormat = "Y"
			}
			a = b.getPreset("year");
			if (a) {
				a.displayDateFormat = "m/d/Y";
				a.headerConfig.middle.dateFormat = "Y"
			}
			a = b.getPreset("manyyears");
			if (a) {
				a.displayDateFormat = "m/d/Y";
				a.headerConfig.middle.dateFormat = "Y"
			}
		}
	}
});
Ext.define("Sch.util.Patch", {
	target: null,
	minVersion: null,
	maxVersion: null,
	reportUrl: null,
	description: null,
	applyFn: null,
	ieOnly: false,
	overrides: null,
	onClassExtended: function(a, b) {
		if (Sch.disableOverrides) {
			return
		}
		if (b.ieOnly && !Ext.isIE) {
			return
		}
		if ((!b.minVersion || Ext.versions.extjs.equals(b.minVersion) || Ext.versions.extjs.isGreaterThan(b.minVersion)) && (!b.maxVersion || Ext.versions.extjs.equals(b.maxVersion) || Ext.versions.extjs.isLessThan(b.maxVersion))) {
			if (b.applyFn) {
				b.applyFn()
			} else {
				Ext.ClassManager.get(b.target).override(b.overrides)
			}
		}
	}
});
Ext.define("Sch.patches.ElementScroll", {
	override: "Sch.mixin.TimelineView",
	_onAfterRender: function() {
		this.callParent(arguments);
		if (Ext.versions.extjs.isLessThan("4.2.1")) {
			return
		}
		this.el.scroll = function(i, a, c) {
			if (!this.isScrollable()) {
				return false
			}
			i = i.substr(0, 1);
			var h = this,
			e = h.dom,
			g = i === "r" || i === "l" ? "left": "top",
			b = false,
			d,
			f;
			if (i === "r" || i === "t" || i === "u") {
				a = -a
			}
			if (g === "left") {
				d = e.scrollLeft;
				f = h.constrainScrollLeft(d + a)
			} else {
				d = e.scrollTop;
				f = h.constrainScrollTop(d + a)
			}
			if (f !== d) {
				this.scrollTo(g, f, c);
				b = true
			}
			return b
		}
	}
});
Ext.define("Sch.mixin.Localizable", {
	requires: [typeof Sch != "undefined" && Sch.config && Sch.config.locale || "Sch.locale.En"],
	legacyMode: true,
	activeLocaleId: "",
	l10n: null,
	isLocaleApplied: function() {
		var b = (this.singleton && this.activeLocaleId) || this.self.activeLocaleId;
		if (!b) {
			return false
		}
		for (var a in Sch.locale.Active) {
			if (b === Sch.locale.Active[a].self.getName()) {
				return true
			}
		}
		return false
	},
	applyLocale: function() {
		for (var a in Sch.locale.Active) {
			Sch.locale.Active[a].apply(this.singleton ? this: this.self.getName())
		}
	},
	L: function() {
		return this.localize.apply(this, arguments)
	},
	localize: function(b, d, g) {
		if (!this.isLocaleApplied() && !g) {
			this.applyLocale()
		}
		if (this.hasOwnProperty("l10n") && this.l10n.hasOwnProperty(b) && "function" != typeof this.l10n[b]) {
			return this.l10n[b]
		}
		var c = this.self && this.self.prototype;
		if (this.legacyMode) {
			var a = d || this.legacyHolderProp;
			var h = a ? this[a] : this;
			if (h && h.hasOwnProperty(b) && "function" != typeof h[b]) {
				return h[b]
			}
			if (c) {
				var e = a ? c[a] : c;
				if (e && e.hasOwnProperty(b) && "function" != typeof e[b]) {
					return e[b]
				}
			}
		}
		var i = c.l10n[b];
		if (i === null || i === undefined) {
			var f = c && c.superclass;
			if (f && f.localize) {
				i = f.localize(b, d, g)
			}
			if (i === null || i === undefined) {
				throw "Cannot find locale: " + b + " [" + this.self.getName() + "]"
			}
		}
		return i
	}
});
Ext.define("Sch.tooltip.ClockTemplate", {
	constructor: function() {
		var i = Math.PI / 180,
		l = Math.cos,
		j = Math.sin,
		m = 7,
		c = 2,
		d = 10,
		k = 6,
		f = 3,
		a = 10,
		e = Ext.isIE && (Ext.ieVersion < 9 || Ext.isIEQuirks);
		function b(n) {
			var q = n * i,
			o = l(q),
			t = j(q),
			r = k * j((90 - n) * i),
			s = k * l((90 - n) * i),
			u = Math.min(k, k - r),
			p = n > 180 ? s: 0,
			v = "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', M11 = " + o + ", M12 = " + ( - t) + ", M21 = " + t + ", M22 = " + o + ")";
			return Ext.String.format("filter:{0};-ms-filter:{0};top:{1}px;left:{2}px;", v, u + f, p + a)
		}
		function h(n) {
			var q = n * i,
			o = l(q),
			t = j(q),
			r = m * j((90 - n) * i),
			s = m * l((90 - n) * i),
			u = Math.min(m, m - r),
			p = n > 180 ? s: 0,
			v = "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', M11 = " + o + ", M12 = " + ( - t) + ", M21 = " + t + ", M22 = " + o + ")";
			return Ext.String.format("filter:{0};-ms-filter:{0};top:{1}px;left:{2}px;", v, u + c, p + d)
		}
		function g(n) {
			return Ext.String.format("transform:rotate({0}deg);-ms-transform:rotate({0}deg);-moz-transform: rotate({0}deg);-webkit-transform: rotate({0}deg);-o-transform:rotate({0}deg);", n)
		}
		return new Ext.XTemplate('<div class="sch-clockwrap {cls}"><div class="sch-clock"><div class="sch-hourIndicator" style="{[this.getHourStyle((values.date.getHours()%12) * 30)]}">{[Ext.Date.monthNames[values.date.getMonth()].substr(0,3)]}</div><div class="sch-minuteIndicator" style="{[this.getMinuteStyle(values.date.getMinutes() * 6)]}">{[values.date.getDate()]}</div></div><span class="sch-clock-text">{text}</span></div>', {
			compiled: true,
			disableFormats: true,
			getMinuteStyle: e ? h: g,
			getHourStyle: e ? b: g
		})
	}
});
Ext.define("Sch.tooltip.Tooltip", {
	extend: "Ext.tip.ToolTip",
	requires: ["Sch.tooltip.ClockTemplate"],
	autoHide: false,
	anchor: "b",
	padding: "0 3 0 0",
	showDelay: 0,
	hideDelay: 0,
	quickShowInterval: 0,
	dismissDelay: 0,
	trackMouse: false,
	valid: true,
	anchorOffset: 5,
	shadow: false,
	frame: false,
	constructor: function(b) {
		var a = Ext.create("Sch.tooltip.ClockTemplate");
		this.renderTo = document.body;
		this.startDate = this.endDate = new Date();
		if (!this.template) {
			this.template = Ext.create("Ext.XTemplate", '<div class="{[values.valid ? "sch-tip-ok" : "sch-tip-notok"]}">', '{[this.renderClock(values.startDate, values.startText, "sch-tooltip-startdate")]}', '{[this.renderClock(values.endDate, values.endText, "sch-tooltip-enddate")]}', "</div>", {
				compiled: true,
				disableFormats: true,
				renderClock: function(d, e, c) {
					return a.apply({
						date: d,
						text: e,
						cls: c
					})
				}
			})
		}
		this.callParent(arguments)
	},
	update: function(a, e, d) {
		if (this.startDate - a !== 0 || this.endDate - e !== 0 || this.valid !== d) {
			this.startDate = a;
			this.endDate = e;
			this.valid = d;
			var c = this.schedulerView.getFormattedDate(a),
			b = this.schedulerView.getFormattedEndDate(e, a);
			if (this.mode === "calendar" && e.getHours() === 0 && e.getMinutes() === 0 && !(e.getYear() === a.getYear() && e.getMonth() === a.getMonth() && e.getDate() === a.getDate())) {
				e = Sch.util.Date.add(e, Sch.util.Date.DAY, -1)
			}
			this.callParent([this.template.apply({
				valid: d,
				startDate: a,
				endDate: e,
				startText: c,
				endText: b
			})])
		}
	},
	show: function(b, a) {
		if (!b) {
			return
		}
		if (Sch.util.Date.compareUnits(this.schedulerView.getTimeResolution().unit, Sch.util.Date.DAY) >= 0) {
			this.mode = "calendar";
			this.addCls("sch-day-resolution")
		} else {
			this.mode = "clock";
			this.removeCls("sch-day-resolution")
		}
		this.mouseOffsets = [a - 18, -7];
		this.setTarget(b);
		this.callParent();
		this.alignTo(b, "bl-tl", this.mouseOffsets);
		this.mon(Ext.getBody(), "mousemove", this.onMyMouseMove, this);
		this.mon(Ext.getBody(), "mouseup", this.onMyMouseUp, this, {
			single: true
		})
	},
	onMyMouseMove: function() {
		this.el.alignTo(this.target, "bl-tl", this.mouseOffsets)
	},
	onMyMouseUp: function() {
		this.mun(Ext.getBody(), "mousemove", this.onMyMouseMove, this)
	},
	afterRender: function() {
		this.callParent(arguments);
		this.el.on("mouseenter", this.onElMouseEnter, this)
	},
	onElMouseEnter: function() {
		this.alignTo(this.target, "bl-tl", this.mouseOffsets)
	}
});
Ext.define("Sch.util.Date", {
	requires: "Ext.Date",
	mixins: ["Sch.mixin.Localizable"],
	singleton: true,
	stripEscapeRe: /(\\.)/g,
	hourInfoRe: /([gGhHisucUOPZ]|MS)/,
	unitHash: null,
	unitsByName: {},
	constructor: function() {
		var a = Ext.Date;
		var c = this.unitHash = {
			MILLI: a.MILLI,
			SECOND: a.SECOND,
			MINUTE: a.MINUTE,
			HOUR: a.HOUR,
			DAY: a.DAY,
			WEEK: "w",
			MONTH: a.MONTH,
			QUARTER: "q",
			YEAR: a.YEAR
		};
		Ext.apply(this, c);
		var b = this;
		this.units = [b.MILLI, b.SECOND, b.MINUTE, b.HOUR, b.DAY, b.WEEK, b.MONTH, b.QUARTER, b.YEAR]
	},
	onLocalized: function() {
		this.setUnitNames(this.L("unitNames"))
	},
	setUnitNames: function(f, b) {
		var e = this.unitsByName = {};
		this.l10n.unitNames = f;
		this._unitNames = Ext.apply({},
		f);
		var c = this.unitHash;
		for (var a in c) {
			if (c.hasOwnProperty(a)) {
				var d = c[a];
				this._unitNames[d] = this._unitNames[a];
				e[a] = d;
				e[d] = d
			}
		}
	},
	betweenLesser: function(b, d, a) {
		var c = b.getTime();
		return d.getTime() <= c && c < a.getTime()
	},
	constrain: function(b, c, a) {
		return this.min(this.max(b, c), a)
	},
	compareUnits: function(c, b) {
		var a = Ext.Array.indexOf(this.units, c),
		d = Ext.Array.indexOf(this.units, b);
		return a > d ? 1: (a < d ? -1: 0)
	},
	isUnitGreater: function(b, a) {
		return this.compareUnits(b, a) > 0
	},
	copyTimeValues: function(b, a) {
		b.setHours(a.getHours());
		b.setMinutes(a.getMinutes());
		b.setSeconds(a.getSeconds());
		b.setMilliseconds(a.getMilliseconds())
	},
	add: function(b, c, e) {
		var f = Ext.Date.clone(b);
		if (!c || e === 0) {
			return f
		}
		switch (c.toLowerCase()) {
		case this.MILLI:
			f = new Date(b.getTime() + e);
			break;
		case this.SECOND:
			f = new Date(b.getTime() + (e * 1000));
			break;
		case this.MINUTE:
			f = new Date(b.getTime() + (e * 60000));
			break;
		case this.HOUR:
			f = new Date(b.getTime() + (e * 3600000));
			break;
		case this.DAY:
			f.setDate(b.getDate() + e);
			break;
		case this.WEEK:
			f.setDate(b.getDate() + e * 7);
			break;
		case this.MONTH:
			var a = b.getDate();
			if (a > 28) {
				a = Math.min(a, Ext.Date.getLastDateOfMonth(this.add(Ext.Date.getFirstDateOfMonth(b), this.MONTH, e)).getDate())
			}
			f.setDate(a);
			f.setMonth(f.getMonth() + e);
			break;
		case this.QUARTER:
			f = this.add(b, this.MONTH, e * 3);
			break;
		case this.YEAR:
			f.setFullYear(b.getFullYear() + e);
			break
		}
		return f
	},
	getMeasuringUnit: function(a) {
		if (a === this.WEEK) {
			return this.DAY
		}
		return a
	},
	getDurationInUnit: function(d, a, c) {
		var b;
		switch (c) {
		case this.YEAR:
			b = Math.round(this.getDurationInYears(d, a));
			break;
		case this.QUARTER:
			b = Math.round(this.getDurationInMonths(d, a) / 3);
			break;
		case this.MONTH:
			b = Math.round(this.getDurationInMonths(d, a));
			break;
		case this.WEEK:
			b = Math.round(this.getDurationInDays(d, a)) / 7;
			break;
		case this.DAY:
			b = Math.round(this.getDurationInDays(d, a));
			break;
		case this.HOUR:
			b = Math.round(this.getDurationInHours(d, a));
			break;
		case this.MINUTE:
			b = Math.round(this.getDurationInMinutes(d, a));
			break;
		case this.SECOND:
			b = Math.round(this.getDurationInSeconds(d, a));
			break;
		case this.MILLI:
			b = Math.round(this.getDurationInMilliseconds(d, a));
			break
		}
		return b
	},
	getUnitToBaseUnitRatio: function(b, a) {
		if (b === a) {
			return 1
		}
		switch (b) {
		case this.YEAR:
			switch (a) {
			case this.QUARTER:
				return 1 / 4;
			case this.MONTH:
				return 1 / 12
			}
			break;
		case this.QUARTER:
			switch (a) {
			case this.YEAR:
				return 4;
			case this.MONTH:
				return 1 / 3
			}
			break;
		case this.MONTH:
			switch (a) {
			case this.YEAR:
				return 12;
			case this.QUARTER:
				return 3
			}
			break;
		case this.WEEK:
			switch (a) {
			case this.DAY:
				return 1 / 7;
			case this.HOUR:
				return 1 / 168
			}
			break;
		case this.DAY:
			switch (a) {
			case this.WEEK:
				return 7;
			case this.HOUR:
				return 1 / 24;
			case this.MINUTE:
				return 1 / 1440
			}
			break;
		case this.HOUR:
			switch (a) {
			case this.DAY:
				return 24;
			case this.MINUTE:
				return 1 / 60
			}
			break;
		case this.MINUTE:
			switch (a) {
			case this.HOUR:
				return 60;
			case this.SECOND:
				return 1 / 60;
			case this.MILLI:
				return 1 / 60000
			}
			break;
		case this.SECOND:
			switch (a) {
			case this.MILLI:
				return 1 / 1000
			}
			break;
		case this.MILLI:
			switch (a) {
			case this.SECOND:
				return 1000
			}
			break
		}
		return - 1
	},
	getDurationInMilliseconds: function(b, a) {
		return (a - b)
	},
	getDurationInSeconds: function(b, a) {
		return (a - b) / 1000
	},
	getDurationInMinutes: function(b, a) {
		return (a - b) / 60000
	},
	getDurationInHours: function(b, a) {
		return (a - b) / 3600000
	},
	getDurationInDays: function(b, a) {
		return (a - b) / 86400000
	},
	getDurationInBusinessDays: function(g, b) {
		var c = Math.round((b - g) / 86400000),
		a = 0,
		f;
		for (var e = 0; e < c; e++) {
			f = this.add(g, this.DAY, e).getDay();
			if (f !== 6 && f !== 0) {
				a++
			}
		}
		return a
	},
	getDurationInMonths: function(b, a) {
		return ((a.getFullYear() - b.getFullYear()) * 12) + (a.getMonth() - b.getMonth())
	},
	getDurationInYears: function(b, a) {
		return this.getDurationInMonths(b, a) / 12
	},
	min: function(b, a) {
		return b < a ? b: a
	},
	max: function(b, a) {
		return b > a ? b: a
	},
	intersectSpans: function(c, d, b, a) {
		return this.betweenLesser(c, b, a) || this.betweenLesser(b, c, d)
	},
	getNameOfUnit: function(a) {
		a = this.getUnitByName(a);
		switch (a.toLowerCase()) {
		case this.YEAR:
			return "YEAR";
		case this.QUARTER:
			return "QUARTER";
		case this.MONTH:
			return "MONTH";
		case this.WEEK:
			return "WEEK";
		case this.DAY:
			return "DAY";
		case this.HOUR:
			return "HOUR";
		case this.MINUTE:
			return "MINUTE";
		case this.SECOND:
			return "SECOND";
		case this.MILLI:
			return "MILLI"
		}
		throw "Incorrect UnitName"
	},
	getReadableNameOfUnit: function(b, a) {
		if (!this.isLocaleApplied()) {
			this.applyLocale()
		}
		return this._unitNames[b][a ? "plural": "single"]
	},
	getShortNameOfUnit: function(a) {
		if (!this.isLocaleApplied()) {
			this.applyLocale()
		}
		return this._unitNames[a].abbrev
	},
	getUnitByName: function(a) {
		if (!this.isLocaleApplied()) {
			this.applyLocale()
		}
		if (!this.unitsByName[a]) {
			Ext.Error.raise("Unknown unit name: " + a)
		}
		return this.unitsByName[a]
	},
	getNext: function(c, g, a, f) {
		var e = Ext.Date.clone(c);
		f = arguments.length < 4 ? 1: f;
		a = a || 1;
		switch (g) {
		case this.MILLI:
			e = this.add(c, g, a);
			break;
		case this.SECOND:
			e = this.add(c, g, a);
			e.setMilliseconds(0);
			break;
		case this.MINUTE:
			e = this.add(c, g, a);
			e.setSeconds(0);
			e.setMilliseconds(0);
			break;
		case this.HOUR:
			e = this.add(c, g, a);
			e.setMinutes(0);
			e.setSeconds(0);
			e.setMilliseconds(0);
			break;
		case this.DAY:
			var d = c.getHours() === 23 && this.add(e, this.HOUR, 1).getHours() === 1;
			if (d) {
				e = this.add(e, this.DAY, 2);
				Ext.Date.clearTime(e);
				return e
			}
			Ext.Date.clearTime(e);
			e = this.add(e, this.DAY, a);
			break;
		case this.WEEK:
			Ext.Date.clearTime(e);
			var b = e.getDay();
			e = this.add(e, this.DAY, f - b + 7 * (a - (f <= b ? 0: 1)));
			if (e.getDay() !== f) {
				e = this.add(e, this.HOUR, 1)
			} else {
				Ext.Date.clearTime(e)
			}
			break;
		case this.MONTH:
			e = this.add(e, this.MONTH, a);
			e.setDate(1);
			Ext.Date.clearTime(e);
			break;
		case this.QUARTER:
			e = this.add(e, this.MONTH, ((a - 1) * 3) + (3 - (e.getMonth() % 3)));
			Ext.Date.clearTime(e);
			e.setDate(1);
			break;
		case this.YEAR:
			e = new Date(e.getFullYear() + a, 0, 1);
			break;
		default:
			throw "Invalid date unit"
		}
		return e
	},
	getNumberOfMsFromTheStartOfDay: function(a) {
		return a - Ext.Date.clearTime(a, true) || 86400000
	},
	getNumberOfMsTillTheEndOfDay: function(a) {
		return this.getStartOfNextDay(a, true) - a
	},
	getStartOfNextDay: function(b, f, e) {
		var d = this.add(e ? b: Ext.Date.clearTime(b, f), this.DAY, 1);
		if (d.getDate() == b.getDate()) {
			var c = this.add(Ext.Date.clearTime(b, f), this.DAY, 2).getTimezoneOffset();
			var a = b.getTimezoneOffset();
			d = this.add(d, this.MINUTE, a - c)
		}
		return d
	},
	getEndOfPreviousDay: function(b, c) {
		var a = c ? b: Ext.Date.clearTime(b, true);
		if (a - b) {
			return a
		} else {
			return this.add(a, this.DAY, -1)
		}
	},
	timeSpanContains: function(c, b, d, a) {
		return (d - c) >= 0 && (b - a) >= 0
	}
});
Ext.define("Sch.util.Debug", {
	singleton: true,
	runDiagnostics: function() {
		var d;
		var a = window.console;
		if (a && a.log) {
			d = function(l) {
				a.log(l)
			}
		} else {
			if (!window.schedulerDebugWin) {
				window.schedulerDebugWin = new Ext.Window({
					height: 400,
					width: 500,
					bodyStyle: "padding:10px",
					closeAction: "hide",
					autoScroll: true
				})
			}
			window.schedulerDebugWin.show();
			schedulerDebugWin.update("");
			d = function(l) {
				schedulerDebugWin.update((schedulerDebugWin.body.dom.innerHTML || "") + l + "<br/>")
			}
		}
		var e = Ext.select(".sch-schedulerpanel");
		if (e.getCount() === 0) {
			d("No scheduler component found")
		}
		var k = Ext.getCmp(e.elements[0].id),
		i = k.getResourceStore(),
		c = k.getEventStore();
		if (!c.isEventStore) {
			d("Your event store must be or extend Sch.data.EventStore")
		}
		d("Scheduler view start: " + k.getStart() + ", end: " + k.getEnd());
		if (!i) {
			d("No store configured");
			return
		}
		if (!c) {
			d("No event store configured");
			return
		}
		d(i.getCount() + " records in the resource store");
		d(c.getCount() + " records in the eventStore");
		var j = c.model.prototype.idProperty;
		var b = i.model.prototype.idProperty;
		var h = c.model.prototype.fields.getByKey(j);
		var f = i.model.prototype.fields.getByKey(b);
		if (! (c.model.prototype instanceof Sch.model.Event)) {
			d("Your event model must extend Sch.model.Event")
		}
		if (! (i.model.prototype instanceof Sch.model.Resource)) {
			d("Your event model must extend Sch.model.Resource")
		}
		if (!h) {
			d("idProperty on the event model is incorrectly setup, value: " + j)
		}
		if (!f) {
			d("idProperty on the resource model is incorrectly setup, value: " + b)
		}
		var g = k.getSchedulingView();
		d(g.el.select(g.eventSelector).getCount() + " events present in the DOM");
		if (c.getCount() > 0) {
			if (!c.first().getStartDate() || !(c.first().getStartDate() instanceof Date)) {
				d("The eventStore reader is misconfigured - The StartDate field is not setup correctly, please investigate");
				d("StartDate is configured with dateFormat: " + c.model.prototype.fields.getByKey("StartDate").dateFormat);
				d("See Ext JS docs for information about different date formats: http://docs.sencha.com/ext-js/4-0/#!/api/Ext.Date")
			}
			if (!c.first().getEndDate() || !(c.first().getEndDate() instanceof Date)) {
				d("The eventStore reader is misconfigured - The EndDate field is not setup correctly, please investigate");
				d("EndDate is configured with dateFormat: " + c.model.prototype.fields.getByKey("EndDate").dateFormat);
				d("See Ext JS docs for information about different date formats: http://docs.sencha.com/ext-js/4-0/#!/api/Ext.Date")
			}
			if (c.proxy && c.proxy.reader && c.proxy.reader.jsonData) {
				d("Dumping jsonData to console");
				console && console.dir && console.dir(c.proxy.reader.jsonData)
			}
			d("Records in the event store:");
			c.each(function(m, l) {
				d((l + 1) + ". " + m.startDateField + ":" + m.getStartDate() + ", " + m.endDateField + ":" + m.getEndDate() + ", " + m.resourceIdField + ":" + m.getResourceId());
				if (!m.getStartDate()) {
					d(m.getStartDate())
				}
			})
		} else {
			d("Event store has no data. Has it been loaded properly?")
		}
		if (i instanceof Ext.data.TreeStore) {
			i = i.nodeStore
		}
		if (i.getCount() > 0) {
			d("Records in the resource store:");
			i.each(function(m, l) {
				d((l + 1) + ". " + m.idProperty + ":" + m.getId());
				return
			})
		} else {
			d("Resource store has no data.");
			return
		}
		d("Everything seems to be setup ok!")
	}
});
Ext.define("Sch.util.DragTracker", {
	extend: "Ext.dd.DragTracker",
	xStep: 1,
	yStep: 1,
	setXStep: function(a) {
		this.xStep = a
	},
	setYStep: function(a) {
		this.yStep = a
	},
	getRegion: function() {
		var e = this.startXY,
		d = this.getXY(),
		b = Math.min(e[0], d[0]),
		f = Math.min(e[1], d[1]),
		c = Math.abs(e[0] - d[0]),
		a = Math.abs(e[1] - d[1]);
		return new Ext.util.Region(f, b + c, f + a, b)
	},
	onMouseDown: function(f, d) {
		if (this.disabled || f.dragTracked) {
			return
		}
		var c = f.getXY(),
		g,
		b,
		a = c[0],
		h = c[1];
		if (this.xStep > 1) {
			g = this.el.getX();
			a -= g;
			a = Math.round(a / this.xStep) * this.xStep;
			a += g
		}
		if (this.yStep > 1) {
			b = this.el.getY();
			h -= b;
			h = Math.round(h / this.yStep) * this.yStep;
			h += b
		}
		this.dragTarget = this.delegate ? d: this.handle.dom;
		this.startXY = this.lastXY = [a, h];
		this.startRegion = Ext.fly(this.dragTarget).getRegion();
		if (this.fireEvent("mousedown", this, f) === false || this.fireEvent("beforedragstart", this, f) === false || this.onBeforeStart(f) === false) {
			return
		}
		this.mouseIsDown = true;
		f.dragTracked = true;
		if (this.preventDefault !== false) {
			f.preventDefault()
		}
		Ext.getDoc().on({
			scope: this,
			mouseup: this.onMouseUp,
			mousemove: this.onMouseMove,
			selectstart: this.stopSelect
		});
		if (this.autoStart) {
			this.timer = Ext.defer(this.triggerStart, this.autoStart === true ? 1000: this.autoStart, this, [f])
		}
	},
	onMouseMove: function(g, f) {
		if (this.active && Ext.isIE && Ext.ieVersion < 10 && !g.browserEvent.button) {
			g.preventDefault();
			this.onMouseUp(g);
			return
		}
		g.preventDefault();
		var d = g.getXY(),
		b = this.startXY;
		if (!this.active) {
			if (Math.max(Math.abs(b[0] - d[0]), Math.abs(b[1] - d[1])) > this.tolerance) {
				this.triggerStart(g)
			} else {
				return
			}
		}
		var a = d[0],
		h = d[1];
		if (this.xStep > 1) {
			a -= this.startXY[0];
			a = Math.round(a / this.xStep) * this.xStep;
			a += this.startXY[0]
		}
		if (this.yStep > 1) {
			h -= this.startXY[1];
			h = Math.round(h / this.yStep) * this.yStep;
			h += this.startXY[1]
		}
		var c = this.xStep > 1 || this.yStep > 1;
		if (!c || a !== d[0] || h !== d[1]) {
			this.lastXY = [a, h];
			if (this.fireEvent("mousemove", this, g) === false) {
				this.onMouseUp(g)
			} else {
				this.onDrag(g);
				this.fireEvent("drag", this, g)
			}
		}
	}
});
Ext.define("Sch.preset.ViewPreset", {
	columnWidth: null,
	rowHeight: null,
	timeAxisColumnWidth: null,
	displayDateFormat: "G:i",
	shiftUnit: "HOUR",
	shiftIncrement: 1,
	defaultSpan: 12,
	timeResolution: null,
	headerConfig: null,
	headers: null,
	mainHeader: 0,
	constructor: function(a) {
		Ext.apply(this, a)
	},
	getHeaders: function() {
		if (this.headers) {
			return this.headers
		}
		var a = this.headerConfig;
		this.mainHeader = a.top ? 1: 0;
		return this.headers = [].concat(a.top || [], a.middle || [], a.bottom || [])
	},
	getMainHeader: function() {
		return this.getHeaders()[this.mainHeader]
	},
	getBottomHeader: function() {
		var a = this.getHeaders();
		return a[a.length - 1]
	},
	getTimeAxisConfig: function() {
		return {
			mainUnit: this.getMainHeader().unit,
			unit: this.getBottomHeader().unit,
			increment: this.getBottomHeader().increment,
			shiftUnit: this.shiftUnit,
			shiftIncrement: this.shiftIncrement,
			defaultSpan: this.defaultSpan,
			resolutionUnit: this.timeResolution.unit,
			resolutionIncrement: this.timeResolution.increment
		}
	},
	clone: function() {
		var a = {};
		var b = this;
		Ext.each(["columnWidth", "rowHeight", "timeAxisColumnWidth", "dateFormat", "shiftUnit", "shiftIncrement", "defaultSpan", "timeResolution", "headerConfig"],
		function(c) {
			a[c] = b[c]
		});
		return new this.self(Ext.clone(a))
	}
});
Ext.define("Sch.preset.Manager", {
	extend: "Ext.util.MixedCollection",
	requires: ["Sch.util.Date", "Sch.preset.ViewPreset"],
	mixins: ["Sch.mixin.Localizable"],
	singleton: true,
	constructor: function() {
		this.callParent(arguments);
		this.registerDefaults()
	},
	registerPreset: function(b, a) {
		if (a) {
			var c = a.headerConfig;
			var d = Sch.util.Date;
			for (var e in c) {
				if (c.hasOwnProperty(e)) {
					if (d[c[e].unit]) {
						c[e].unit = d[c[e].unit.toUpperCase()]
					}
				}
			}
			if (!a.timeColumnWidth) {
				a.timeColumnWidth = 50
			}
			if (a.timeResolution && d[a.timeResolution.unit]) {
				a.timeResolution.unit = d[a.timeResolution.unit.toUpperCase()]
			}
			if (a.shiftUnit && d[a.shiftUnit]) {
				a.shiftUnit = d[a.shiftUnit.toUpperCase()]
			}
		}
		if (this.isValidPreset(a)) {
			if (this.containsKey(b)) {
				this.removeAtKey(b)
			}
			this.add(b, new Sch.preset.ViewPreset(a))
		} else {
			throw "Invalid preset, please check your configuration"
		}
	},
	isValidPreset: function(a) {
		var d = Sch.util.Date,
		b = true,
		c = Sch.util.Date.units;
		for (var e in a.headerConfig) {
			if (a.headerConfig.hasOwnProperty(e)) {
				b = b && Ext.Array.indexOf(c, a.headerConfig[e].unit) >= 0
			}
		}
		if (a.timeResolution) {
			b = b && Ext.Array.indexOf(c, a.timeResolution.unit) >= 0
		}
		if (a.shiftUnit) {
			b = b && Ext.Array.indexOf(c, a.shiftUnit) >= 0
		}
		return b
	},
	getPreset: function(a) {
		return this.get(a)
	},
	deletePreset: function(a) {
		this.removeAtKey(a)
	},
	registerDefaults: function() {
		var b = this,
		a = this.defaultPresets;
		for (var c in a) {
			b.registerPreset(c, a[c])
		}
	},
	defaultPresets: {
		minuteAndHour: {
			timeColumnWidth: 100,
			rowHeight: 24,
			resourceColumnWidth: 100,
			displayDateFormat: "G:i",
			shiftIncrement: 1,
			shiftUnit: "HOUR",
			defaultSpan: 24,
			timeResolution: {
				unit: "MINUTE",
				increment: 30
			},
			headerConfig: {
				middle: {
					unit: "MINUTE",
					increment: "30",
					align: "center",
					dateFormat: "i"
				},
				top: {
					unit: "HOUR",
					align: "center",
					dateFormat: "D, gA/d"
				}
			}
		},
		hourAndDay: {
			timeColumnWidth: 60,
			rowHeight: 24,
			resourceColumnWidth: 100,
			displayDateFormat: "G:i",
			shiftIncrement: 1,
			shiftUnit: "DAY",
			defaultSpan: 24,
			timeResolution: {
				unit: "MINUTE",
				increment: 30
			},
			headerConfig: {
				middle: {
					unit: "HOUR",
					align: "center",
					dateFormat: "G:i"
				},
				top: {
					unit: "DAY",
					align: "center",
					dateFormat: "D d/m"
				}
			}
		},
		dayAndWeek: {
			timeColumnWidth: 100,
			rowHeight: 24,
			resourceColumnWidth: 100,
			displayDateFormat: "Y-m-d G:i",
			shiftUnit: "DAY",
			shiftIncrement: 1,
			defaultSpan: 5,
			timeResolution: {
				unit: "HOUR",
				increment: 1
			},
			headerConfig: {
				middle: {
					unit: "DAY",
					align: "center",
					dateFormat: "D d M"
				},
				top: {
					unit: "WEEK",
					align: "center",
					renderer: function(c, b, a) {
						return Sch.util.Date.getShortNameOfUnit("WEEK") + "." + Ext.Date.format(c, "W M Y")
					}
				}
			}
		},
		weekAndDay: {
			timeColumnWidth: 100,
			rowHeight: 24,
			resourceColumnWidth: 100,
			displayDateFormat: "Y-m-d",
			shiftUnit: "WEEK",
			shiftIncrement: 1,
			defaultSpan: 1,
			timeResolution: {
				unit: "DAY",
				increment: 1
			},
			headerConfig: {
				bottom: {
					unit: "DAY",
					align: "center",
					increment: 1,
					dateFormat: "d/m"
				},
				middle: {
					unit: "WEEK",
					dateFormat: "D d M"
				}
			}
		},
		weekAndMonth: {
			timeColumnWidth: 100,
			rowHeight: 24,
			resourceColumnWidth: 100,
			displayDateFormat: "Y-m-d",
			shiftUnit: "WEEK",
			shiftIncrement: 5,
			defaultSpan: 6,
			timeResolution: {
				unit: "DAY",
				increment: 1
			},
			headerConfig: {
				middle: {
					unit: "WEEK",
					renderer: function(c, b, a) {
						return Ext.Date.format(c, "d M")
					}
				},
				top: {
					unit: "MONTH",
					align: "center",
					dateFormat: "M Y"
				}
			}
		},
		monthAndYear: {
			timeColumnWidth: 110,
			rowHeight: 24,
			resourceColumnWidth: 100,
			displayDateFormat: "Y-m-d",
			shiftIncrement: 3,
			shiftUnit: "MONTH",
			defaultSpan: 12,
			timeResolution: {
				unit: "DAY",
				increment: 1
			},
			headerConfig: {
				middle: {
					unit: "MONTH",
					align: "center",
					dateFormat: "M Y"
				},
				top: {
					unit: "YEAR",
					align: "center",
					dateFormat: "Y"
				}
			}
		},
		year: {
			timeColumnWidth: 100,
			rowHeight: 24,
			resourceColumnWidth: 100,
			displayDateFormat: "Y-m-d",
			shiftUnit: "YEAR",
			shiftIncrement: 1,
			defaultSpan: 1,
			timeResolution: {
				unit: "MONTH",
				increment: 1
			},
			headerConfig: {
				middle: {
					unit: "QUARTER",
					align: "center",
					renderer: function(c, b, a) {
						return Ext.String.format(Sch.util.Date.getShortNameOfUnit("QUARTER").toUpperCase() + "{0}", Math.floor(c.getMonth() / 3) + 1)
					}
				},
				top: {
					unit: "YEAR",
					align: "center",
					dateFormat: "Y"
				}
			}
		},
		manyyears: {
			timeColumnWidth: 50,
			rowHeight: 24,
			resourceColumnWidth: 100,
			displayDateFormat: "Y-m-d",
			shiftUnit: "YEAR",
			shiftIncrement: 1,
			defaultSpan: 1,
			timeResolution: {
				unit: "YEAR",
				increment: 1
			},
			headerConfig: {
				middle: {
					unit: "YEAR",
					align: "center",
					dateFormat: "Y"
				}
			}
		},
		weekAndDayLetter: {
			timeColumnWidth: 20,
			rowHeight: 24,
			resourceColumnWidth: 100,
			displayDateFormat: "Y-m-d",
			shiftUnit: "WEEK",
			shiftIncrement: 1,
			defaultSpan: 10,
			timeResolution: {
				unit: "DAY",
				increment: 1
			},
			headerConfig: {
				bottom: {
					unit: "DAY",
					align: "center",
					renderer: function(a) {
						return Ext.Date.dayNames[a.getDay()].substring(0, 1)
					}
				},
				middle: {
					unit: "WEEK",
					dateFormat: "D d M Y"
				}
			}
		},
		weekDateAndMonth: {
			timeColumnWidth: 30,
			rowHeight: 24,
			resourceColumnWidth: 100,
			displayDateFormat: "Y-m-d",
			shiftUnit: "WEEK",
			shiftIncrement: 1,
			defaultSpan: 10,
			timeResolution: {
				unit: "DAY",
				increment: 1
			},
			headerConfig: {
				middle: {
					unit: "WEEK",
					align: "center",
					dateFormat: "d"
				},
				top: {
					unit: "MONTH",
					dateFormat: "Y F"
				}
			}
		}
	}
});
Ext.define("Sch.feature.AbstractTimeSpan", {
	extend: "Ext.AbstractPlugin",
	lockableScope: "top",
	schedulerView: null,
	timeAxis: null,
	containerEl: null,
	expandToFitView: false,
	disabled: false,
	cls: null,
	template: null,
	store: null,
	renderElementsBuffered: false,
	renderDelay: 15,
	refreshSizeOnItemUpdate: true,
	_resizeTimer: null,
	_renderTimer: null,
	constructor: function(a) {
		this.uniqueCls = this.uniqueCls || ("sch-timespangroup-" + Ext.id());
		Ext.apply(this, a);
		this.callParent(arguments)
	},
	setDisabled: function(a) {
		if (a) {
			this.removeElements()
		}
		this.disabled = a
	},
	getElements: function() {
		if (this.containerEl) {
			return this.containerEl.select("." + this.uniqueCls)
		}
		return null
	},
	removeElements: function() {
		var a = this.getElements();
		if (a) {
			a.each(function(b) {
				b.destroy()
			})
		}
	},
	init: function(a) {
		if (Ext.versions.touch && !a.isReady()) {
			a.on("viewready",
			function() {
				this.init(a)
			},
			this);
			return
		}
		this.schedulerView = a.getSchedulingView();
		this.panel = a;
		this.timeAxis = a.getTimeAxis();
		this.store = Ext.StoreManager.lookup(this.store);
		if (!this.store) {
			Ext.Error.raise("Error: You must define a store for this plugin")
		}
		if (!this.schedulerView.getEl()) {
			this.schedulerView.on({
				afterrender: this.onAfterRender,
				scope: this
			})
		} else {
			this.onAfterRender()
		}
		this.schedulerView.on({
			destroy: this.onDestroy,
			scope: this
		})
	},
	onAfterRender: function(c) {
		var a = this.schedulerView;
		this.containerEl = a.getSecondaryCanvasEl();
		this.storeListeners = {
			load: this.renderElements,
			datachanged: this.renderElements,
			clear: this.renderElements,
			add: this.renderElements,
			remove: this.renderElements,
			update: this.refreshSingle,
			addrecords: this.renderElements,
			removerecords: this.renderElements,
			updaterecord: this.refreshSingle,
			scope: this
		};
		this.store.on(this.storeListeners);
		if (Ext.data.NodeStore && a.store instanceof Ext.data.NodeStore) {
			if (a.animate) {} else {
				a.mon(a.store, {
					expand: this.renderElements,
					collapse: this.renderElements,
					scope: this
				})
			}
		}
		a.on({
			bufferedrefresh: this.renderElements,
			refresh: this.renderElements,
			itemadd: this.refreshSizeOnItemUpdate ? this.refreshSizes: this.renderElements,
			itemremove: this.refreshSizeOnItemUpdate ? this.refreshSizes: this.renderElements,
			itemupdate: this.refreshSizeOnItemUpdate ? this.refreshSizes: this.renderElements,
			groupexpand: this.renderElements,
			groupcollapse: this.renderElements,
			columnwidthchange: this.renderElements,
			resize: this.renderElements,
			scope: this
		});
		if (a.headerCt) {
			a.headerCt.on({
				add: this.renderElements,
				remove: this.renderElements,
				scope: this
			})
		}
		this.panel.on({
			viewchange: this.renderElements,
			show: this.refreshSizes,
			orientationchange: function() {
				this.renderElementsBuffered = false;
				clearTimeout(this._renderTimer);
				clearTimeout(this._resizeTimer);
				this.renderElements()
			},
			scope: this
		});
		var b = a.getRowContainerEl();
		if (b && b.down(".sch-timetd")) {
			this.renderElements()
		}
	},
	refreshSizes: function() {
		clearTimeout(this._resizeTimer);
		this._resizeTimer = Ext.Function.defer(function() {
			if (!this.schedulerView.isDestroyed && this.schedulerView.getOrientation() === "horizontal") {
				var a = this.schedulerView.getTimeSpanRegion(new Date(), null, this.expandToFitView);
				this.getElements().setHeight(a.bottom - a.top)
			}
		},
		this.renderDelay, this)
	},
	renderElements: function() {
		if (this.renderElementsBuffered || this.disabled) {
			return
		}
		this.renderElementsBuffered = true;
		clearTimeout(this._renderTimer);
		this._renderTimer = Ext.Function.defer(this.renderElementsInternal, this.renderDelay, this)
	},
	renderElementsInternal: function() {
		this.renderElementsBuffered = false;
		if (this.disabled || this.schedulerView.isDestroyed) {
			return
		}
		if (Ext.versions.extjs && !this.schedulerView.el.down("table")) {
			return
		}
		this.removeElements();
		Ext.DomHelper.append(this.containerEl, this.generateMarkup())
	},
	generateMarkup: function(b) {
		var d = this.timeAxis.getStart(),
		a = this.timeAxis.getEnd(),
		c = this.getElementData(d, a, null, b);
		return this.template.apply(c)
	},
	getElementData: function(b, a) {
		throw "Abstract method call"
	},
	onDestroy: function() {
		clearTimeout(this._renderTimer);
		clearTimeout(this._resizeTimer);
		if (this.store.autoDestroy) {
			this.store.destroy()
		}
		this.store.un(this.storeListeners)
	},
	refreshSingle: function(c, b) {
		var e = Ext.get(this.uniqueCls + "-" + b.internalId);
		if (e) {
			var g = this.timeAxis.getStart(),
			a = this.timeAxis.getEnd(),
			f = this.getElementData(g, a, [b])[0],
			d = b.clsField || "Cls";
			if (f) {
				e.dom.className = this.cls + " " + this.uniqueCls + " " + (f[d] || "");
				e.setTop(f.top);
				e.setLeft(f.left);
				e.setSize(f.width, f.height)
			} else {
				Ext.destroy(e)
			}
		} else {
			this.renderElements()
		}
	}
});
Ext.define("Sch.feature.DragCreator", {
	requires: ["Ext.XTemplate", "Sch.util.Date", "Sch.util.DragTracker", "Sch.tooltip.Tooltip", "Sch.tooltip.ClockTemplate"],
	disabled: false,
	showHoverTip: true,
	showDragTip: true,
	dragTolerance: 2,
	validatorFn: Ext.emptyFn,
	validatorFnScope: null,
	constructor: function(a) {
		Ext.apply(this, a || {});
		this.lastTime = new Date();
		this.template = this.template || Ext.create("Ext.Template", '<div class="sch-dragcreator-proxy"><div class="sch-event-inner">&#160;</div></div>', {
			compiled: true,
			disableFormats: true
		});
		this.schedulerView.on("destroy", this.onSchedulerDestroy, this);
		this.schedulerView.el.on("mousemove", this.setupTooltips, this, {
			single: true
		});
		this.callParent([a])
	},
	setDisabled: function(a) {
		this.disabled = a;
		if (this.hoverTip) {
			this.hoverTip.setDisabled(a)
		}
		if (this.dragTip) {
			this.dragTip.setDisabled(a)
		}
	},
	getProxy: function() {
		if (!this.proxy) {
			this.proxy = this.template.append(this.schedulerView.getSecondaryCanvasEl(), {},
			true)
		}
		return this.proxy
	},
	onMouseMove: function(c) {
		var a = this.hoverTip;
		if (a.disabled || this.dragging) {
			return
		}
		if (c.getTarget("." + this.schedulerView.timeCellCls, 5) && !c.getTarget(this.schedulerView.eventSelector)) {
			var b = this.schedulerView.getDateFromDomEvent(c, "floor");
			if (b) {
				if (b - this.lastTime !== 0) {
					this.updateHoverTip(b);
					if (a.hidden) {
						a[Sch.util.Date.compareUnits(this.schedulerView.getTimeResolution().unit, Sch.util.Date.DAY) >= 0 ? "addCls": "removeCls"]("sch-day-resolution");
						a.show()
					}
				}
			} else {
				a.hide();
				this.lastTime = null
			}
		} else {
			a.hide();
			this.lastTime = null
		}
	},
	updateHoverTip: function(a) {
		if (a) {
			var b = this.schedulerView.getFormattedDate(a);
			this.hoverTip.update(this.hoverTipTemplate.apply({
				date: a,
				text: b
			}));
			this.lastTime = a
		}
	},
	onBeforeDragStart: function(d, g) {
		var b = this.schedulerView,
		a = g.getTarget("." + b.timeCellCls, 5);
		if (a && !g.getTarget(b.eventSelector)) {
			var c = b.resolveResource(a);
			var f = b.getDateFromDomEvent(g);
			if (!this.disabled && a && b.fireEvent("beforedragcreate", b, c, f, g) !== false) {
				this.resourceRecord = c;
				this.originalStart = f;
				this.resourceRegion = b.getScheduleRegion(this.resourceRecord, this.originalStart);
				this.dateConstraints = b.getDateConstraints(this.resourceRecord, this.originalStart);
				return true
			}
		}
		return false
	},
	onDragStart: function() {
		var d = this,
		b = d.schedulerView,
		c = d.getProxy(),
		a = d.schedulerView.snapToIncrement;
		this.dragging = true;
		if (this.hoverTip) {
			this.hoverTip.disable()
		}
		d.start = d.originalStart;
		d.end = d.start;
		if (b.getOrientation() === "horizontal") {
			d.rowBoundaries = {
				top: d.resourceRegion.top,
				bottom: d.resourceRegion.bottom
			};
			c.setRegion({
				top: d.rowBoundaries.top,
				right: d.tracker.startXY[0],
				bottom: d.rowBoundaries.bottom,
				left: d.tracker.startXY[0]
			})
		} else {
			d.rowBoundaries = {
				left: d.resourceRegion.left,
				right: d.resourceRegion.right
			};
			c.setRegion({
				top: d.tracker.startXY[1],
				right: d.resourceRegion.right,
				bottom: d.tracker.startXY[1],
				left: d.resourceRegion.left
			})
		}
		c.show();
		d.schedulerView.fireEvent("dragcreatestart", d.schedulerView);
		if (d.showDragTip) {
			d.dragTip.enable();
			d.dragTip.update(d.start, d.end, true);
			d.dragTip.show(c);
			d.dragTip.el.setStyle("visibility", "visible")
		}
	},
	onDrag: function(f, h) {
		var d = this,
		c = d.schedulerView,
		b = d.tracker.getRegion().constrainTo(d.resourceRegion),
		g = c.getStartEndDatesFromRegion(b, "round");
		if (!g) {
			return
		}
		d.start = g.start || d.start;
		d.end = g.end || d.end;
		var a = d.dateConstraints;
		if (a) {
			d.end = Sch.util.Date.constrain(d.end, a.start, a.end);
			d.start = Sch.util.Date.constrain(d.start, a.start, a.end)
		}
		d.valid = this.validatorFn.call(d.validatorFnScope || d, d.resourceRecord, d.start, d.end) !== false;
		if (d.showDragTip) {
			d.dragTip.update(d.start, d.end, d.valid)
		}
		Ext.apply(b, d.rowBoundaries);
		this.getProxy().setRegion(b)
	},
	onDragEnd: function(d, f) {
		var c = this,
		a = c.schedulerView,
		b = true;
		c.dragging = false;
		if (c.showDragTip) {
			c.dragTip.disable()
		}
		if (!c.start || !c.end || (c.end - c.start <= 0)) {
			c.valid = false
		}
		c.createContext = {
			start: c.start,
			end: c.end,
			resourceRecord: c.resourceRecord,
			e: f,
			finalize: function() {
				c.finalize.apply(c, arguments)
			}
		};
		if (c.valid) {
			b = a.fireEvent("beforedragcreatefinalize", c, c.createContext, f) !== false
		}
		if (b) {
			c.finalize(c.valid)
		}
	},
	finalize: function(a) {
		var b = this.createContext;
		var d = this.schedulerView;
		if (a) {
			var c = Ext.create(d.eventStore.model);
			if (Ext.data.TreeStore && d.eventStore instanceof Ext.data.TreeStore) {
				c.set("leaf", true);
				d.eventStore.append(c)
			}
			c.assign(b.resourceRecord);
			c.setStartEndDate(b.start, b.end);
			d.fireEvent("dragcreateend", d, c, b.resourceRecord, b.e)
		} else {
			this.proxy.hide()
		}
		this.schedulerView.fireEvent("afterdragcreate", d);
		if (this.hoverTip) {
			this.hoverTip.enable()
		}
	},
	tipCfg: {
		trackMouse: true,
		bodyCssClass: "sch-hovertip",
		autoHide: false,
		dismissDelay: 1000,
		showDelay: 300
	},
	dragging: false,
	setupTooltips: function() {
		var b = this,
		a = b.schedulerView;
		b.tracker = new Sch.util.DragTracker({
			el: a.el,
			tolerance: b.dragTolerance,
			listeners: {
				beforedragstart: b.onBeforeDragStart,
				dragstart: b.onDragStart,
				drag: b.onDrag,
				dragend: b.onDragEnd,
				scope: b
			}
		});
		if (this.showDragTip) {
			this.dragTip = Ext.create("Sch.tooltip.Tooltip", {
				cls: "sch-dragcreate-tip",
				schedulerView: a,
				listeners: {
					beforeshow: function() {
						return b.dragging
					}
				}
			})
		}
		if (b.showHoverTip) {
			var c = a.el;
			b.hoverTipTemplate = b.hoverTipTemplate || Ext.create("Sch.tooltip.ClockTemplate");
			b.hoverTip = new Ext.ToolTip(Ext.applyIf({
				renderTo: document.body,
				target: c,
				disabled: b.disabled
			},
			b.tipCfg));
			b.hoverTip.on("beforeshow", b.tipOnBeforeShow, b);
			a.mon(c, {
				mouseleave: function() {
					b.hoverTip.hide()
				},
				mousemove: b.onMouseMove,
				scope: b
			})
		}
	},
	onSchedulerDestroy: function() {
		if (this.hoverTip) {
			this.hoverTip.destroy()
		}
		if (this.dragTip) {
			this.dragTip.destroy()
		}
		if (this.tracker) {
			this.tracker.destroy()
		}
		if (this.proxy) {
			Ext.destroy(this.proxy);
			this.proxy = null
		}
	},
	tipOnBeforeShow: function(a) {
		return ! this.disabled && !this.dragging && this.lastTime !== null
	}
});
Ext.define("Sch.feature.DropZone", {
	extend: "Ext.dd.DropZone",
	constructor: function() {
		this.callParent(arguments);
		var a = this.schedulerView;
		this.proxyTpl = this.proxyTpl || new Ext.XTemplate('<span class="sch-dd-newtime">{[ this.getText(values) ]}</span>', {
			getText: function(b) {
				var c = a.getFormattedDate(b.StartDate);
				if (b.Duration) {
					c += " - " + a.getFormattedEndDate(Sch.util.Date.add(b.StartDate, Sch.util.Date.MILLI, b.Duration), b.StartDate)
				}
				return c
			}
		})
	},
	validatorFn: Ext.emptyFn,
	getTargetFromEvent: function(a) {
		return a.getTarget("." + this.schedulerView.timeCellCls)
	},
	onNodeEnter: function(d, a, c, b) {
		Ext.fly(d).addCls("sch-dd-cellover")
	},
	onNodeOut: function(d, a, c, b) {
		Ext.fly(d).removeCls("sch-dd-cellover")
	},
	onNodeOver: function(i, a, h, g) {
		var d = this.schedulerView,
		c = d.getDateFromDomEvent(h, "round"),
		f;
		if (!c) {
			return this.dropNotAllowed
		}
		this.proxyTpl.overwrite(a.proxy.el.down(".sch-dd-proxy-hd"), {
			StartDate: c,
			Duration: g.duration
		});
		var b = d.resolveResource(h.getTarget("." + d.timeCellCls));
		if (this.validatorFn.call(this.validatorFnScope || this, g.records, b, c, g.duration, h) !== false) {
			return this.dropAllowed + ((this.enableCopy && h.ctrlKey) ? " add": "")
		} else {
			return this.dropNotAllowed
		}
	},
	onNodeDrop: function(i, c, j, g) {
		var l = this.schedulerView,
		b = l.resolveResource(i),
		f = l.getDateFromDomEvent(j, "round"),
		a = false,
		k = this.enableCopy && j.ctrlKey;
		if (f && this.validatorFn.call(this.validatorFnScope || this, g.records, b, f, g.duration, j) !== false) {
			var d,
			h = l.resourceStore.indexOf(b);
			if (k) {
				d = this.copyRecords(g.records, f, b, g.sourceEventRecord, h);
				a = true
			} else {
				a = this.updateRecords(g.records, f, b, g.sourceEventRecord, h, g)
			}
			if (a) {
				l.getSelectionModel().deselectAll()
			}
			l.fireEvent("eventdrop", l, k ? d: g.records, k)
		}
		l.fireEvent("aftereventdrop", l);
		return a
	},
	updateRecords: function(e, c, s, l, d, h) {
		if (e.length === 1) {
			l.beginEdit();
			l.assign(s);
			l.setStartDate(c);
			l.setEndDate(Sch.util.Date.add(c, Sch.util.Date.MILLI, h.duration));
			l.endEdit();
			return true
		}
		var j = l.getStartDate(),
		o = this.schedulerView.resourceStore,
		q = c - j,
		k = o.indexOf(l.getResource()),
		n,
		m,
		f,
		a,
		p,
		b = o.getCount(),
		g;
		for (g = 0; g < e.length; g++) {
			a = e[g];
			m = o.indexOf(a.getResource());
			p = m - k + d;
			if (p < 0 || p > b) {
				return false
			}
		}
		for (g = 0; g < e.length; g++) {
			a = e[g];
			m = o.indexOf(a.getResource());
			n = m - k;
			f = o.getAt(d + n);
			a.beginEdit();
			a.assign(f);
			a.setStartDate(Sch.util.Date.add(a.getStartDate(), Sch.util.Date.MILLI, q));
			a.setEndDate(Sch.util.Date.add(a.getEndDate(), Sch.util.Date.MILLI, q));
			a.endEdit()
		}
		return true
	},
	copyRecords: function(d, g, b, f, c) {
		var a = d[0],
		e = a.copy(),
		h = f.getEndDate() - f.getStartDate();
		e.assign(b);
		e.setStartDate(g);
		e.setEndDate(Sch.util.Date.add(g, Sch.util.Date.MILLI, h));
		return [e]
	}
});
Ext.define("Sch.feature.PointDragZone", {
	extend: "Ext.dd.DragZone",
	requires: ["Sch.tooltip.Tooltip"],
	repairHighlight: false,
	repairHighlightColor: "transparent",
	containerScroll: true,
	dropAllowed: "sch-dragproxy",
	dropNotAllowed: "sch-dragproxy",
	constructor: function(b, a) {
		this.proxy = this.proxy || Ext.create("Ext.dd.StatusProxy", {
			shadow: false,
			dropAllowed: this.dropAllowed,
			dropNotAllowed: this.dropNotAllowed
		});
		this.callParent(arguments);
		this.isTarget = true;
		this.scroll = false;
		this.ignoreSelf = false;
		Ext.dd.ScrollManager.register(this.schedulerView.el);
		if (this.schedulerView.rtl) {
			this.proxy.addCls("sch-rtl")
		}
	},
	destroy: function() {
		this.callParent(arguments);
		if (this.tip) {
			this.tip.destroy()
		}
		Ext.dd.ScrollManager.unregister(this.schedulerView.el)
	},
	autoOffset: function(a, b) {
		this.setDelta(this.dragData.offsets[0], this.dragData.offsets[1])
	},
	constrainTo: function(a, b) {
		this.resetConstraints();
		this.initPageX = a.left;
		this.initPageY = a.top;
		this.setXConstraint(a.left, a.right - (b.right - b.left), this.xTickSize);
		this.setYConstraint(a.top, a.bottom - (b.bottom - b.top), this.yTickSize)
	},
	setXConstraint: function(c, b, a) {
		this.leftConstraint = c;
		this.rightConstraint = b;
		this.minX = c;
		this.maxX = b;
		if (a) {
			this.setXTicks(this.initPageX, a)
		}
		this.constrainX = true
	},
	setYConstraint: function(a, c, b) {
		this.topConstraint = a;
		this.bottomConstraint = c;
		this.minY = a;
		this.maxY = c;
		if (b) {
			this.setYTicks(this.initPageY, b)
		}
		this.constrainY = true
	},
	onDragEnter: Ext.emptyFn,
	onDragOut: Ext.emptyFn,
	resolveStartEndDates: function(e) {
		var a = this.dragData,
		c,
		d = a.origStart,
		b = a.origEnd;
		if (!a.startsOutsideView) {
			c = this.schedulerView.getStartEndDatesFromRegion(e, "round");
			if (c) {
				d = c.start || a.startDate;
				b = Sch.util.Date.add(d, Sch.util.Date.MILLI, a.duration)
			}
		} else {
			if (!a.endsOutsideView) {
				c = this.schedulerView.getStartEndDatesFromRegion(e, "round");
				if (c) {
					b = c.end || a.endDate;
					d = Sch.util.Date.add(b, Sch.util.Date.MILLI, -a.duration)
				}
			}
		}
		return {
			startDate: d,
			endDate: b
		}
	},
	onDragOver: function(c, f) {
		var a = this.dragData;
		if (!a.originalHidden) {
			Ext.each(a.eventEls,
			function(e) {
				e.hide()
			});
			a.originalHidden = true
		}
		var d = a.startDate;
		var b = a.newResource;
		this.updateDragContext(c);
		if (a.startDate - d !== 0 || b !== a.newResource) {
			this.schedulerView.fireEvent("eventdrag", this.schedulerView, a.eventRecords, a.startDate, a.newResource, a)
		}
		if (this.showTooltip) {
			this.tip.update(a.startDate, a.endDate, a.valid)
		}
	},
	onStartDrag: function(b, d) {
		var c = this.schedulerView,
		a = this.dragData;
		c.fireEvent("eventdragstart", c, a.eventRecords)
	},
	startDrag: function() {
		var b = this.callParent(arguments);
		this.dragData.refElement = this.proxy.el.down("#sch-id-dd-ref");
		if (this.showTooltip) {
			var a = this.schedulerView;
			if (!this.tip) {
				this.tip = Ext.create("Sch.tooltip.Tooltip", {
					schedulerView: a,
					cls: "sch-dragdrop-tip",
					renderTo: document.body
				})
			}
			this.tip.update(this.dragData.origStart, this.dragData.origEnd, true);
			this.tip.el.setStyle("visibility");
			this.tip.show(this.dragData.refElement, this.dragData.offsets[0])
		}
		return b
	},
	getDragData: function(x) {
		var q = this.schedulerView,
		p = x.getTarget(q.eventSelector);
		if (!p) {
			return
		}
		var l = q.resolveEventRecord(p);
		if (!l || l.isDraggable() === false || q.fireEvent("beforeeventdrag", q, l, x) === false) {
			return null
		}
		var i = x.getXY(),
		a = Ext.get(p),
		y = a.getXY(),
		k = [i[0] - y[0], i[1] - y[1]],
		m = a.getRegion(),
		u = q.getSnapPixelAmount();
		var b = q.resolveResource(p);
		this.clearTicks();
		a.removeCls("sch-event-hover");
		if (q.constrainDragToResource) {
			if (!b) {
				throw "Resource could not be resolved for event: " + l.getId()
			}
			this.constrainToResource(q.getScheduleRegion(b, l), m, q.getOrientation())
		} else {
			this.constrainTo(q.getScheduleRegion(null, l), m)
		}
		if (u > 1) {
			if (q.getOrientation() === "horizontal") {
				this.setXConstraint(this.leftConstraint, this.rightConstraint, u)
			} else {
				this.setYConstraint(this.topConstraint, this.bottomConstraint, u)
			}
		}
		var d = l.getStartDate(),
		o = l.getEndDate(),
		n = q.timeAxis,
		j = n.getStart(),
		h = n.getEnd(),
		v = d < j,
		r = o > h,
		c = Ext.getBody().getScroll(),
		g = this.getRelatedRecords(l),
		w = [a];
		Ext.Array.each(g,
		function(s) {
			var e = q.getElementFromEventRecord(s);
			if (e) {
				w.push(e)
			}
		});
		var f = {
			offsets: k,
			eventEls: w,
			repairXY: y,
			eventRecords: [l].concat(g),
			relatedEventRecords: g,
			resourceRecord: b,
			origStart: d,
			origEnd: o,
			startDate: d,
			endDate: o,
			duration: o - d,
			startsOutsideView: v,
			endsOutsideView: r,
			bodyScroll: c,
			eventObj: x
		};
		f.ddel = this.getDragElement(a, f);
		return f
	},
	constrainToResource: function(b, c, a) {
		this.resetConstraints();
		this.initPageX = b.left;
		this.initPageY = b.top;
		if (a === "horizontal") {
			this.setXConstraint(b.left, b.right - (c.right - c.left), this.xTickSize);
			this.setYConstraint(c.top, c.top, this.yTickSize)
		} else {
			this.setXConstraint(c.left, c.left, this.xTickSize);
			this.setYConstraint(b.top, b.bottom - (c.bottom - c.top), this.yTickSize)
		}
	},
	getRelatedRecords: function(c) {
		var b = this.schedulerView;
		var d = b.selModel;
		var a = [];
		if (d.selected.getCount() > 1) {
			d.selected.each(function(e) {
				if (e !== c && e.isDraggable() !== false) {
					a.push(e)
				}
			})
		}
		return a
	},
	getDragElement: function(a, e) {
		var c = this.schedulerView;
		var d = e.eventEls;
		var f;
		if (d.length > 1) {
			var b = Ext.get(Ext.core.DomHelper.createDom({
				tag: "div",
				cls: "sch-dd-wrap",
				style: {
					overflow: "visible"
				}
			}));
			Ext.Array.each(d,
			function(h) {
				f = h.dom.cloneNode(true);
				if (h.dom === a.dom) {
					f.id = "sch-id-dd-ref"
				} else {
					f.id = Ext.id()
				}
				b.appendChild(f);
				var g = h.getOffsetsTo(a);
				Ext.fly(f).setStyle({
					left: g[0] + "px",
					top: g[1] + "px"
				})
			});
			return b.dom
		} else {
			f = a.dom.cloneNode(true);
			f.id = "sch-id-dd-ref";
			f.style.left = 0;
			f.style.top = 0;
			return f
		}
	},
	onDragDrop: function(h, i) {
		this.updateDragContext(h);
		var d = this,
		b = d.schedulerView,
		g = d.cachedTarget || Ext.dd.DragDropMgr.getDDById(i),
		f = d.dragData,
		a = false,
		c = true;
		f.ddCallbackArgs = [g, h, i];
		if (f.valid && f.startDate && f.endDate) {
			f.finalize = function() {
				d.finalize.apply(d, arguments)
			};
			c = b.fireEvent("beforeeventdropfinalize", d, f, h) !== false;
			if (c && d.isValidDrop(f.resourceRecord, f.newResource, f.relatedEventRecords, f.eventRecords[0])) {
				a = (f.startDate - f.origStart) !== 0 || f.newResource !== f.resourceRecord
			}
		}
		if (c) {
			d.finalize(f.valid && a)
		}
	},
	finalize: function(c) {
		var e = this,
		b = e.schedulerView,
		f = e.dragData;
		if (e.tip) {
			e.tip.hide()
		}
		if (c) {
			var a,
			d = function() {
				a = true
			};
			b.on("itemupdate", d, null, {
				single: true
			});
			e.updateRecords(f);
			b.un("itemupdate", d, null, {
				single: true
			});
			if (!a) {
				e.onInvalidDrop.apply(e, f.ddCallbackArgs)
			} else {
				if (Ext.isIE9) {
					e.proxy.el.setStyle("visibility", "hidden");
					Ext.Function.defer(e.onValidDrop, 10, e, f.ddCallbackArgs)
				} else {
					e.onValidDrop.apply(e, f.ddCallbackArgs)
				}
				b.fireEvent("aftereventdrop", b, f.eventRecords)
			}
		} else {
			e.onInvalidDrop.apply(e, f.ddCallbackArgs)
		}
	},
	updateRecords: function(a) {
		throw "Must be implemented by subclass"
	},
	isValidDrop: function(a, b, d, c) {
		return true
	},
	onInvalidDrop: function(d, c, f) {
		if (Ext.isIE && !c) {
			c = d;
			d = d.getTarget() || document.body
		}
		var a = this.schedulerView,
		b;
		if (this.tip) {
			this.tip.hide()
		}
		Ext.each(this.dragData.eventEls,
		function(e) {
			e.show()
		});
		b = this.callParent([d, c, f]);
		a.fireEvent("aftereventdrop", a, this.dragData.eventRecords);
		return b
	}
});
Ext.define("Sch.feature.SchedulerDragZone", {
	extend: "Sch.feature.PointDragZone",
	requires: ["Sch.tooltip.Tooltip"],
	onDragOver: function(b, c) {
		this.callParent(arguments);
		if (this.showTooltip) {
			var a = this.getDragContext(b);
			if (a) {
				this.tip.update(a.startDate, a.endDate, a.valid)
			}
		}
	},
	getDragContext: function(d) {
		var a = this.dragData;
		if (!a.refElement) {
			return
		}
		var c = this.schedulerView,
		f = a.refElement.getRegion();
		var b = this.resolveStartEndDates(f);
		b.resource = c.constrainDragToResource ? a.resourceRecord: this.resolveResource([f.left + a.offsets[0], f.top + a.offsets[1]], d);
		if (b.resource) {
			b.valid = this.validatorFn.call(this.validatorFnScope || this, a.eventRecords, b.resource, b.startDate, a.duration, d)
		} else {
			b.valid = false
		}
		return b
	},
	startDrag: function() {
		var b = this.callParent(arguments);
		if (this.showTooltip) {
			var a = this.schedulerView;
			if (!this.tip) {
				this.tip = Ext.create("Sch.tooltip.Tooltip", {
					schedulerView: a,
					cls: "sch-dragdrop-tip"
				})
			}
			this.tip.update(this.dragData.startDate, this.dragData.endDate, true);
			this.tip.el.setStyle("visibility");
			this.tip.show(this.proxy.el, this.dragData.offsets[0])
		}
		return b
	},
	updateRecords: function(c) {
		var h = this,
		l = h.schedulerView,
		i = l.resourceStore,
		e = c.newResource,
		f = c.eventRecords,
		j = f[0];
		j.beginEdit();
		if (e !== c.resourceRecord) {
			j.unassign(c.resourceRecord);
			j.assign(e)
		}
		j.setStartDate(c.startDate, true, l.eventStore.skipWeekendsDuringDragDrop);
		j.endEdit();
		var b = c.startDate,
		d = c.relatedEventRecords,
		a = b - c.origStart,
		g,
		k = Ext.data.TreeStore && i instanceof Ext.data.TreeStore;
		if (k) {
			g = l.indexOf(c.resourceRecord) - l.indexOf(e)
		} else {
			g = i.indexOf(c.resourceRecord) - i.indexOf(e)
		}
		Ext.each(d,
		function(n) {
			n.shift(Ext.Date.MILLI, a);
			if (k) {
				var m = l.store.indexOf(n.getResource()) - g;
				n.setResource(l.store.getAt(m))
			} else {
				n.setResource(i.getAt(i.indexOf(n.getResource()) - g))
			}
		});
		l.fireEvent("eventdrop", l, c.eventRecords, false)
	},
	isValidDrop: function(g, d, e, b) {
		if (g !== d && b.isAssignedTo(d)) {
			return false
		}
		if (g === d || e.length === 0) {
			return true
		}
		var h = this.schedulerView,
		a = true,
		f,
		j = Ext.data.TreeStore && h.resourceStore instanceof Ext.data.TreeStore,
		c = j ? h.store: h.resourceStore,
		i;
		f = c.indexOf(g) - c.indexOf(d);
		Ext.each(e,
		function(k) {
			i = c.indexOf(g) - f;
			if (i < 0 || i >= c.getCount()) {
				a = false;
				return false
			}
		});
		return a
	},
	resolveResource: function(f, d) {
		var b = this.proxy.el.dom;
		b.style.display = "none";
		var c = document.elementFromPoint(f[0] - this.dragData.bodyScroll.left, f[1] - this.dragData.bodyScroll.top);
		if (Ext.isIE8 && d && d.browserEvent.synthetic) {
			c = document.elementFromPoint(f[0] - this.dragData.bodyScroll.left, f[1] - this.dragData.bodyScroll.top)
		}
		b.style.display = "block";
		if (!c) {
			return null
		}
		if (!c.className.match(this.schedulerView.timeCellCls)) {
			var a = Ext.fly(c).up("." + this.schedulerView.timeCellCls);
			if (a) {
				c = a.dom
			} else {
				return null
			}
		}
		return this.schedulerView.resolveResource(c)
	},
	updateDragContext: function(d) {
		var a = this.dragData;
		if (!a.refElement) {
			return
		}
		var c = this.schedulerView,
		f = a.refElement.getRegion();
		var b = this.resolveStartEndDates(f);
		a.startDate = b.startDate;
		a.endDate = b.endDate;
		a.newResource = c.constrainDragToResource ? a.resourceRecord: this.resolveResource([f.left + a.offsets[0], f.top + a.offsets[1]], d);
		if (a.newResource) {
			a.valid = this.validatorFn.call(this.validatorFnScope || this, a.eventRecords, a.newResource, a.startDate, a.duration, d)
		} else {
			a.valid = false
		}
	}
});
Ext.define("Sch.feature.DragDrop", {
	requires: ["Ext.XTemplate", "Sch.feature.SchedulerDragZone"],
	validatorFn: function(b, a, c, f, d) {
		return true
	},
	enableCopy: false,
	showTooltip: true,
	constructor: function(d, a) {
		Ext.apply(this, a);
		this.schedulerView = d;
		var b = !!document.elementFromPoint;
		if (b) {
			this.initProxyLessDD()
		} else {
			if (typeof console !== "undefined") {
				var e = console;
				e.log("WARNING: Your browser does not support document.elementFromPoint required for the Drag drop feature")
			}
		}
		this.schedulerView.on("destroy", this.cleanUp, this);
		this.callParent([a])
	},
	cleanUp: function() {
		if (this.schedulerView.eventDragZone) {
			this.schedulerView.eventDragZone.destroy()
		}
		if (this.schedulerView.dropZone) {
			this.schedulerView.dropZone.destroy()
		}
	},
	initProxyLessDD: function() {
		var a = this.schedulerView;
		a.eventDragZone = Ext.create("Sch.feature.SchedulerDragZone", a.ownerCt.el, Ext.apply({
			ddGroup: a.id,
			schedulerView: a,
			enableCopy: this.enableCopy,
			validatorFn: this.validatorFn,
			validatorFnScope: this.validatorFnScope,
			showTooltip: this.showTooltip
		},
		this.dragConfig))
	}
});
Ext.define("Sch.feature.ResizeZone", {
	extend: "Ext.util.Observable",
	requires: ["Ext.resizer.Resizer", "Sch.tooltip.Tooltip"],
	showTooltip: true,
	validatorFn: Ext.emptyFn,
	validatorFnScope: null,
	schedulerView: null,
	origEl: null,
	handlePos: null,
	eventRec: null,
	tip: null,
	constructor: function(a) {
		Ext.apply(this, a);
		var b = this.schedulerView;
		b.on({
			destroy: this.cleanUp,
			scope: this
		});
		b.mon(b.el, {
			mousedown: this.onMouseDown,
			mouseup: this.onMouseUp,
			scope: this,
			delegate: ".sch-resizable-handle"
		});
		this.callParent(arguments)
	},
	onMouseDown: function(f, a) {
		var b = this.schedulerView;
		var d = this.eventRec = b.resolveEventRecord(a);
		var c = d.isResizable();
		if (c === false || typeof c === "string" && !a.className.match(c)) {
			return
		}
		this.eventRec = d;
		this.handlePos = this.getHandlePosition(a);
		this.origEl = Ext.get(f.getTarget(".sch-event"));
		b.el.on({
			mousemove: this.onMouseMove,
			scope: this,
			single: true
		})
	},
	onMouseUp: function(c, a) {
		var b = this.schedulerView;
		b.el.un({
			mousemove: this.onMouseMove,
			scope: this,
			single: true
		})
	},
	onMouseMove: function(f, a) {
		var b = this.schedulerView;
		var d = this.eventRec;
		if (!d || b.fireEvent("beforeeventresize", b, d, f) === false) {
			return
		}
		delete this.eventRec;
		f.stopEvent();
		var c = this.handlePos;
		this.resizer = this.createResizer(this.origEl, d, c, f, a);
		this.resizer.resizeTracker.onMouseDown(f, this.resizer[c].dom);
		if (this.showTooltip) {
			if (!this.tip) {
				this.tip = Ext.create("Sch.tooltip.Tooltip", {
					schedulerView: b,
					cls: "sch-resize-tip"
				})
			}
			this.tip.update(d.getStartDate(), d.getEndDate(), true);
			this.tip.show(this.origEl)
		}
		b.fireEvent("eventresizestart", b, d)
	},
	getHandlePosition: function(a) {
		if (this.schedulerView.getOrientation() === "horizontal") {
			if (this.schedulerView.rtl) {
				return a.className.match("start") ? "east": "west"
			}
			return a.className.match("start") ? "west": "east"
		} else {
			return a.className.match("start") ? "north": "south"
		}
	},
	createResizer: function(c, g, b) {
		var l = this.schedulerView,
		f = l.resolveResource(c),
		h = l.getSnapPixelAmount(),
		j = l.getScheduleRegion(f, g),
		a = l.getDateConstraints(f, g),
		e = {
			target: c,
			dateConstraints: a,
			resourceRecord: f,
			eventRecord: g,
			handles: b.substring(0, 1),
			minHeight: c.getHeight(),
			constrainTo: j,
			listeners: {
				resizedrag: this.partialResize,
				resize: this.afterResize,
				scope: this
			}
		};
		var k = c.id;
		var d = "_" + k;
		c.id = c.dom.id = d;
		Ext.cache[d] = Ext.cache[k];
		if (l.getOrientation() === "vertical") {
			if (h > 0) {
				Ext.apply(e, {
					minHeight: h,
					heightIncrement: h
				})
			}
		} else {
			if (h > 0) {
				Ext.apply(e, {
					minWidth: h,
					widthIncrement: h
				})
			}
		}
		var i = Ext.create("Ext.resizer.Resizer", e);
		c.setStyle("z-index", parseInt(c.getStyle("z-index"), 10) + 1);
		return i
	},
	getStartEndDates: function(f) {
		var e = this.resizer,
		c = e.el,
		d = this.schedulerView,
		b = (d.rtl && e.handles[0] === "e") || (!d.rtl && e.handles[0] === "w") || e.handles[0] === "n",
		g,
		a;
		if (b) {
			a = e.eventRecord.getEndDate();
			g = d.getDateFromXY([d.rtl ? c.getRight() : c.getLeft(), c.getTop()], "round")
		} else {
			g = e.eventRecord.getStartDate();
			a = d.getDateFromXY([d.rtl ? c.getLeft() : c.getRight(), c.getBottom()], "round")
		}
		if (e.dateConstraints) {
			g = Sch.util.Date.constrain(g, e.dateConstraints.start, e.dateConstraints.end);
			a = Sch.util.Date.constrain(a, e.dateConstraints.start, e.dateConstraints.end)
		}
		return {
			start: g,
			end: a
		}
	},
	partialResize: function(b, d, h, g) {
		var j = this.schedulerView,
		i = this.getStartEndDates(g.getXY()),
		c = i.start,
		f = i.end;
		if (!c || !f || ((b.start - c === 0) && (b.end - f === 0))) {
			return
		}
		var a = this.validatorFn.call(this.validatorFnScope || this, b.resourceRecord, b.eventRecord, c, f) !== false;
		b.end = f;
		b.start = c;
		j.fireEvent("eventpartialresize", j, b.eventRecord, c, f, b.el);
		if (this.showTooltip) {
			this.tip.update(c, f, a)
		}
	},
	afterResize: function(a, m, f, g) {
		if (this.showTooltip) {
			this.tip.hide()
		}
		delete Ext.cache[a.el.id];
		a.el.id = a.el.dom.id = a.el.id.substr(1);
		var j = this,
		i = a.resourceRecord,
		k = a.eventRecord,
		d = k.getStartDate(),
		p = k.getEndDate(),
		b = a.start || d,
		c = a.end || p,
		o = j.schedulerView,
		n = false,
		l = true;
		j.resizeContext = {
			eventRecord: k,
			start: b,
			end: c,
			finalize: function() {
				j.finalize.apply(j, arguments)
			}
		};
		if (b && c && (c - b > 0) && ((b - d !== 0) || (c - p !== 0)) && j.validatorFn.call(j.validatorFnScope || j, i, k, b, c, g) !== false) {
			l = o.fireEvent("beforeeventresizefinalize", j, j.resizeContext, g) !== false;
			n = true
		} else {
			o.refreshKeepingScroll()
		}
		if (l) {
			j.finalize(n)
		}
	},
	finalize: function(a) {
		var b = this.schedulerView;
		var c = this.resizeContext;
		if (a) {
			c.eventRecord.setStartEndDate(c.start, c.end, b.eventStore.skipWeekendsDuringDragDrop)
		} else {
			b.refreshKeepingScroll()
		}
		this.resizer.destroy();
		b.fireEvent("eventresizeend", b, c.eventRecord);
		this.resizeContext = null
	},
	cleanUp: function() {
		if (this.tip) {
			this.tip.destroy()
		}
	}
});
Ext.define("Sch.eventlayout.Horizontal", {
	view: null,
	nbrOfBandsByResource: null,
	constructor: function(a) {
		Ext.apply(this, a);
		this.nbrOfBandsByResource = {}
	},
	clearCache: function(a) {
		if (a) {
			delete this.nbrOfBandsByResource[a.internalId]
		} else {
			this.nbrOfBandsByResource = {}
		}
	},
	getNumberOfBands: function(b, c) {
		if (!this.view.dynamicRowHeight) {
			return 1
		}
		var a = this.nbrOfBandsByResource;
		if (a.hasOwnProperty(b.internalId)) {
			return a[b.internalId]
		}
		return this.calculateNumberOfBands(b, c)
	},
	getRowHeight: function(b, c) {
		var a = this.view;
		var d = this.getNumberOfBands(b, c);
		return (d * a.rowHeight) - ((d - 1) * a.barMargin)
	},
	calculateNumberOfBands: function(c, e) {
		var d = [];
		e = e || this.view.eventStore.getEventsForResource(c);
		for (var a = 0; a < e.length; a++) {
			var b = e[a];
			d[d.length] = {
				start: b.getStartDate(),
				end: b.getEndDate()
			}
		}
		return this.applyLayout(d, c)
	},
	applyLayout: function(a, b) {
		var c = a.slice();
		c.sort(this.sortEvents);
		return this.nbrOfBandsByResource[b.internalId] = this.layoutEventsInBands(0, c)
	},
	sortEvents: function(e, d) {
		var c = (e.start - d.start === 0);
		if (c) {
			return e.end > d.end ? -1: 1
		} else {
			return (e.start < d.start) ? -1: 1
		}
	},
	layoutEventsInBands: function(e, b) {
		var a = this.view;
		do {
			var d = b[0],
			c = e === 0 ? a.barMargin: (e * a.rowHeight - (e - 1) * a.barMargin);
			if (c >= a.cellBottomBorderWidth) {
				c -= a.cellBottomBorderWidth
			}
			while (d) {
				d.top = c;
				Ext.Array.remove(b, d);
				d = this.findClosestSuccessor(d, b)
			}
			e++
		}
		while (b.length > 0);
		return e
	},
	findClosestSuccessor: function(g, e) {
		var c = Infinity,
		f,
		a = g.end,
		h;
		for (var d = 0, b = e.length; d < b; d++) {
			h = e[d].start - a;
			if (h >= 0 && h < c) {
				f = e[d];
				c = h
			}
		}
		return f
	}
});
Ext.define("Sch.eventlayout.Vertical", {
	requires: ["Sch.util.Date"],
	constructor: function(a) {
		Ext.apply(this, a)
	},
	applyLayout: function(a, f) {
		if (a.length === 0) {
			return
		}
		a.sort(this.sortEvents);
		var d,
		c,
		k = this.view,
		m = Sch.util.Date,
		o = 1,
		s,
		b,
		h = f - (2 * k.barMargin),
		e,
		r;
		for (var t = 0, q = a.length; t < q; t++) {
			e = a[t];
			d = e.start;
			c = e.end;
			b = this.findStartSlot(a, e);
			var u = this.getCluster(a, t);
			if (u.length > 1) {
				e.left = b.start;
				e.width = b.end - b.start;
				r = 1;
				while (r < (u.length - 1) && u[r + 1].start - e.start === 0) {
					r++
				}
				var p = this.findStartSlot(a, u[r]);
				if (p && p.start < 0.8) {
					u = u.slice(0, r)
				}
			}
			var g = u.length,
			n = (b.end - b.start) / g;
			for (r = 0; r < g; r++) {
				u[r].width = n;
				u[r].left = b.start + (r * n)
			}
			t += g - 1
		}
		for (t = 0, q = a.length; t < q; t++) {
			a[t].width = a[t].width * h;
			a[t].left = k.barMargin + (a[t].left * h)
		}
	},
	findStartSlot: function(c, d) {
		var a = this.getPriorOverlappingEvents(c, d),
		b;
		if (a.length === 0) {
			return {
				start: 0,
				end: 1
			}
		}
		for (b = 0; b < a.length; b++) {
			if (b === 0 && a[0].left > 0) {
				return {
					start: 0,
					end: a[0].left
				}
			} else {
				if (a[b].left + a[b].width < (b < a.length - 1 ? a[b + 1].left: 1)) {
					return {
						start: a[b].left + a[b].width,
						end: b < a.length - 1 ? a[b + 1].left: 1
					}
				}
			}
		}
		return false
	},
	getPriorOverlappingEvents: function(e, f) {
		var g = Sch.util.Date,
		h = f.start,
		b = f.end,
		c = [];
		for (var d = 0, a = Ext.Array.indexOf(e, f); d < a; d++) {
			if (g.intersectSpans(h, b, e[d].start, e[d].end)) {
				c.push(e[d])
			}
		}
		c.sort(this.sortOverlappers);
		return c
	},
	sortOverlappers: function(b, a) {
		return b.left < a.left ? -1: 1
	},
	getCluster: function(e, g) {
		if (g >= e.length - 1) {
			return [e[g]]
		}
		var c = [e[g]],
		h = e[g].start,
		b = e[g].end,
		a = e.length,
		f = Sch.util.Date,
		d = g + 1;
		while (d < a && f.intersectSpans(h, b, e[d].start, e[d].end)) {
			c.push(e[d]);
			h = f.max(h, e[d].start);
			b = f.min(e[d].end, b);
			d++
		}
		return c
	},
	sortEvents: function(e, d) {
		var c = (e.start - d.start === 0);
		if (c) {
			return e.end > d.end ? -1: 1
		} else {
			return (e.start < d.start) ? -1: 1
		}
	}
});
Ext.define("Sch.column.Resource", {
	extend: "Ext.grid.Column",
	alias: "widget.resourcecolumn",
	cls: "sch-resourcecolumn-header",
	align: "center",
	menuDisabled: true,
	hideable: false,
	sortable: false,
	locked: false,
	lockable: false,
	model: null
});
Ext.define("Sch.view.model.TimeAxis", {
	extend: "Ext.util.Observable",
	requires: ["Ext.Date", "Sch.util.Date"],
	timeAxis: null,
	availableWidth: 0,
	tickWidth: 100,
	snapToIncrement: false,
	forceFit: false,
	suppressFit: false,
	refCount: 0,
	columnConfig: {},
	constructor: function(a) {
		var b = this;
		Ext.apply(this, a);
		b.addEvents("update");
		if (b.timeAxis.preset) {
			b.tickWidth = b.timeAxis.preset.timeColumnWidth
		}
		b.timeAxis.on("reconfigure", b.onTimeAxisReconfigure, b);
		this.callParent(arguments)
	},
	destroy: function() {
		this.timeAxis.un("reconfigure", this.onTimeAxisReconfigure, this)
	},
	onTimeAxisReconfigure: function() {
		this.tickWidth = this.timeAxis.preset.timeColumnWidth;
		this.update()
	},
	getColumnConfig: function() {
		return this.columnConfig
	},
	update: function(d, b) {
		var e = this.timeAxis,
		c = e.headerConfig;
		this.availableWidth = Math.max(d || this.availableWidth, 0);
		if (this.forceFit && this.availableWidth <= 0) {
			return
		}
		this.columnConfig = {};
		for (var f in c) {
			if (c[f].cellGenerator) {
				this.columnConfig[f] = c[f].cellGenerator.call(this, this.timeAxis.getStart(), this.timeAxis.getEnd())
			} else {
				this.columnConfig[f] = this.createHeaderRow(f, c[f])
			}
		}
		var a = this.columnConfig.bottom || this.columnConfig.middle;
		this.tickWidth = this.calculateTickWidth(this.getTickWidth());
		if (!Ext.isNumber(this.availableWidth) || this.availableWidth < 0) {
			throw "Invalid available width provided to Sch.view.model.TimeAxis"
		}
		if (!Ext.isNumber(this.tickWidth) || this.tickWidth <= 0) {
			throw "Invalid column width calculated in Sch.view.model.TimeAxis"
		}
		if (!b) {
			this.fireEvent("update", this)
		}
	},
	createHeaderRow: function(a, d) {
		var c = [],
		e = this,
		g,
		f = d.align,
		b = Ext.Date.clearTime(new Date());
		e.timeAxis.forEachInterval(a,
		function(k, h, j) {
			g = {
				align: f,
				start: k,
				end: h,
				headerCls: ""
			};
			if (d.renderer) {
				g.header = d.renderer.call(d.scope || e, k, h, g, j)
			} else {
				g.header = Ext.Date.format(k, d.dateFormat)
			}
			if (d.unit === Sch.util.Date.DAY && (!d.increment || d.increment === 1)) {
				g.headerCls += " sch-dayheadercell-" + k.getDay();
				if (Ext.Date.clearTime(k, true) - b === 0) {
					g.headerCls += " sch-dayheadercell-today"
				}
			}
			c.push(g)
		});
		return c
	},
	getDistanceBetweenDates: function(f, b) {
		var d = this.timeAxis.unit,
		c,
		e = Sch.util.Date.getMeasuringUnit(d),
		a = Sch.util.Date.getDurationInUnit(f, b, e);
		if (this.timeAxis.isContinuous()) {
			c = a * this.getSingleUnitInPixels(e)
		} else {
			c = this.getPositionFromDate(b) - this.getPositionFromDate(f)
		}
		return c
	},
	getPositionFromDate: function(a) {
		var c = -1,
		b = this.timeAxis.getTickFromDate(a);
		if (b >= 0) {
			c = this.tickWidth * b
		}
		return c
	},
	getDateFromPosition: function(a, d) {
		var c = a / this.getTickWidth(),
		b = this.timeAxis.getCount();
		if (c < 0 || c > b) {
			return null
		}
		return this.timeAxis.getDateFromTick(c, d)
	},
	getSingleUnitInPixels: function(a) {
		return Sch.util.Date.getUnitToBaseUnitRatio(this.timeAxis.getUnit(), a) * this.tickWidth / this.timeAxis.increment
	},
	getSnapPixelAmount: function() {
		if (this.snapToIncrement) {
			var a = this.timeAxis.getResolution();
			return (a.increment || 1) * this.getSingleUnitInPixels(a.unit)
		} else {
			return 1
		}
	},
	getTickWidth: function() {
		return this.tickWidth
	},
	setTickWidth: function(b, a) {
		this.tickWidth = b;
		this.update(null, a)
	},
	getTotalWidth: function() {
		return this.tickWidth * this.timeAxis.getCount()
	},
	calculateTickWidth: function(c) {
		var i = this.forceFit;
		var b = 0,
		e = this.timeAxis.getUnit(),
		k = this.timeAxis.getCount(),
		h = Number.MAX_VALUE,
		f,
		a;
		if (this.snapToIncrement) {
			var g = this.timeAxis.getResolution(),
			j = g.unit,
			d = g.increment;
			h = Sch.util.Date.getUnitToBaseUnitRatio(e, j) * d
		}
		f = Sch.util.Date.getMeasuringUnit(e);
		h = Math.min(h, Sch.util.Date.getUnitToBaseUnitRatio(e, f));
		a = Math[i ? "floor": "round"](this.getAvailableWidth() / this.timeAxis.getCount());
		if (!this.suppressFit) {
			b = (i || c < a) ? a: c;
			if (h > 0 && (!i || h < 1)) {
				b = Math.round(Math.max(1, Math[i ? "floor": "round"](h * b)) / h)
			}
		} else {
			b = c
		}
		return b
	},
	getAvailableWidth: function() {
		return this.availableWidth
	},
	setAvailableWidth: function(a) {
		this.availableWidth = Math.max(0, a);
		var b = this.calculateTickWidth(this.tickWidth);
		if (b !== this.tickWidth) {
			this.tickWidth = b;
			this.update()
		}
	},
	fitToAvailableWidth: function(a) {
		var b = Math.floor(this.availableWidth / this.timeAxis.getCount());
		this.setTickWidth(b, a)
	},
	setForceFit: function(a) {
		if (a !== this.forceFit) {
			this.forceFit = a;
			this.update()
		}
	},
	setSnapToIncrement: function(a) {
		if (a !== this.snapToIncrement) {
			this.snapToIncrement = a;
			this.update()
		}
	}
});
Ext.define("Sch.view.HorizontalTimeAxis", {
	extend: "Ext.util.Observable",
	requires: ["Ext.XTemplate"],
	trackHeaderOver: true,
	compactCellWidthThreshold: 15,
	baseCls: "sch-column-header",
	tableCls: "sch-header-row",
	headerHtmlRowTpl: '<table border="0" cellspacing="0" cellpadding="0" style="width: {totalWidth}px; {tstyle}" class="{{tableCls}} sch-header-row-{position} {cls}"><thead><tr><tpl for="cells"><td class="{{baseCls}} {headerCls}" style="position : static; text-align: {align}; width: {width}px; {style}" tabIndex="0"headerPosition="{parent.position}" headerIndex="{[xindex-1]}"><div class="sch-simple-timeheader">{header}</div></td></tpl></tr></thead></table>',
	model: null,
	hoverCls: "",
	containerEl: null,
	constructor: function(d) {
		var e = this;
		var b = !!Ext.versions.touch;
		var a = b ? "tap": "click";
		Ext.apply(this, d);
		e.callParent(arguments);
		e.model.on({
			update: e.onModelUpdate,
			scope: e
		});
		this.addEvents("refresh");
		e.containerEl = Ext.get(e.containerEl);
		if (! (e.headerHtmlRowTpl instanceof Ext.Template)) {
			e.headerHtmlRowTpl = e.headerHtmlRowTpl.replace("{{baseCls}}", this.baseCls).replace("{{tableCls}}", this.tableCls);
			e.headerHtmlRowTpl = new Ext.XTemplate(e.headerHtmlRowTpl)
		}
		if (e.trackHeaderOver && e.hoverCls) {
			e.containerEl.on({
				mousemove: e.highlightCell,
				delegate: ".sch-column-header",
				scope: e
			});
			e.containerEl.on({
				mouseleave: e.clearHighlight,
				scope: e
			})
		}
		var c = {
			scope: this,
			delegate: ".sch-column-header"
		};
		if (b) {
			c.tap = this.onElClick("tap");
			c.doubletap = this.onElClick("doubletap");
			this.addEvents("timeheadertap", "timeheaderdoubletap")
		} else {
			c.click = this.onElClick("click");
			c.dblclick = this.onElClick("dblclick");
			this.addEvents("timeheaderclick", "timeheaderdblclick")
		}
		e._listenerCfg = c;
		if (e.containerEl) {
			e.containerEl.on(c)
		}
	},
	destroy: function() {
		var a = this;
		if (a.containerEl) {
			a.containerEl.un(a._listenerCfg);
			a.containerEl.un({
				mousemove: a.highlightCell,
				delegate: ".sch-simple-timeheader",
				scope: a
			});
			a.containerEl.un({
				mouseleave: a.clearHighlight,
				scope: a
			})
		}
		a.model.un({
			update: a.onModelUpdate,
			scope: a
		})
	},
	onModelUpdate: function() {
		this.render()
	},
	getHTML: function(g, f, d) {
		var b = this.model.getColumnConfig();
		var a = this.model.getTotalWidth();
		var c = "";
		var e;
		if (b.top) {
			this.embedCellWidths(b.top);
			c += this.headerHtmlRowTpl.apply({
				totalWidth: a,
				cells: b.top,
				position: "top",
				tstyle: "border-top : 0;"
			})
		}
		if (b.middle) {
			this.embedCellWidths(b.middle);
			c += this.headerHtmlRowTpl.apply({
				totalWidth: a,
				cells: b.middle,
				position: "middle",
				tstyle: b.top ? "": "border-top : 0;",
				cls: !b.bottom && this.model.getTickWidth() <= this.compactCellWidthThreshold ? "sch-header-row-compact": ""
			})
		}
		if (b.bottom) {
			this.embedCellWidths(b.bottom);
			c += this.headerHtmlRowTpl.apply({
				totalWidth: a,
				cells: b.bottom,
				position: "bottom",
				tstyle: "",
				cls: this.model.getTickWidth() <= this.compactCellWidthThreshold ? "sch-header-row-compact": ""
			})
		}
		return c + '<div class="sch-header-secondary-canvas"></div>'
	},
	render: function() {
		if (!this.containerEl) {
			return
		}
		var e = this.containerEl,
		f = e.dom,
		d = f.style.display,
		a = this.model.getColumnConfig(),
		b = f.parentNode;
		f.style.display = "none";
		b.removeChild(f);
		var c = this.getHTML();
		f.innerHTML = c;
		if (!a.top && !a.middle) {
			this.containerEl.addCls("sch-header-single-row")
		} else {
			this.containerEl.removeCls("sch-header-single-row")
		}
		b && b.appendChild(f);
		f.style.display = d;
		this.fireEvent("refresh", this)
	},
	embedCellWidths: function(b) {
		var e = (Ext.isIE7 || Ext.isSafari) ? 1: 0;
		for (var c = 0; c < b.length; c++) {
			var a = b[c];
			var d = this.model.getDistanceBetweenDates(a.start, a.end);
			if (d) {
				a.width = d - (c ? e: 0)
			} else {
				a.width = 0;
				a.style = "display: none"
			}
		}
	},
	onElClick: function(a) {
		return function(e, f) {
			f = e.delegatedTarget || f;
			var b = Ext.fly(f).getAttribute("headerPosition"),
			c = Ext.fly(f).getAttribute("headerIndex"),
			d = this.model.getColumnConfig()[b][c];
			this.fireEvent("timeheader" + a, this, d.start, d.end, e)
		}
	},
	highlightCell: function(c, a) {
		var b = this;
		if (a !== b.highlightedCell) {
			b.clearHighlight();
			b.highlightedCell = a;
			Ext.fly(a).addCls(b.hoverCls)
		}
	},
	clearHighlight: function() {
		var b = this,
		a = b.highlightedCell;
		if (a) {
			Ext.fly(a).removeCls(b.hoverCls);
			delete b.highlightedCell
		}
	}
});
Ext.define("Sch.column.timeAxis.Horizontal", {
	extend: "Ext.grid.column.Column",
	alias: "widget.timeaxiscolumn",
	draggable: false,
	groupable: false,
	hideable: false,
	sortable: false,
	fixed: true,
	menuDisabled: true,
	cls: "sch-simple-timeaxis",
	tdCls: "sch-timetd",
	requires: ["Sch.view.HorizontalTimeAxis"],
	timeAxisViewModel: null,
	headerView: null,
	hoverCls: "sch-column-header-over",
	trackHeaderOver: true,
	compactCellWidthThreshold: 20,
	initComponent: function() {
		this.ownHoverCls = this.hoverCls;
		this.hoverCls = "";
		this.callParent(arguments)
	},
	afterRender: function() {
		var a = this;
		a.headerView = new Sch.view.HorizontalTimeAxis({
			model: a.timeAxisViewModel,
			containerEl: a.titleEl,
			hoverCls: a.ownHoverCls,
			trackHeaderOver: a.trackHeaderOver,
			compactCellWidthThreshold: a.compactCellWidthThreshold
		});
		a.headerView.on("refresh", a.onTimeAxisViewRefresh, a);
		a.ownerCt.on("afterlayout",
		function() {
			a.mon(a.ownerCt, "resize", a.onHeaderContainerResize, a);
			if (this.getWidth() > 0) {
				a.timeAxisViewModel.update(a.getAvailableWidthForSchedule());
				a.setWidth(a.timeAxisViewModel.getTotalWidth())
			}
		},
		null, {
			single: true
		});
		this.enableBubble("timeheaderclick", "timeheaderdblclick");
		a.relayEvents(a.headerView, ["timeheaderclick", "timeheaderdblclick"]);
		a.callParent(arguments)
	},
	initRenderData: function() {
		var a = this;
		a.renderData.headerCls = a.renderData.headerCls || a.headerCls;
		return a.callParent(arguments)
	},
	destroy: function() {
		if (this.headerView) {
			this.headerView.destroy()
		}
		this.callParent(arguments)
	},
	onTimeAxisViewRefresh: function() {
		this.headerView.un("refresh", this.onTimeAxisViewRefresh, this);
		this.setWidth(this.timeAxisViewModel.getTotalWidth());
		this.headerView.on("refresh", this.onTimeAxisViewRefresh, this)
	},
	getAvailableWidthForSchedule: function() {
		var c = this.ownerCt.getWidth();
		var a = this.ownerCt.items;
		for (var b = 1; b < a.length; b++) {
			c -= a.get(b).getWidth()
		}
		return c - Ext.getScrollbarSize().width - 1
	},
	onResize: function() {
		this.callParent(arguments);
		this.timeAxisViewModel.setAvailableWidth(this.getAvailableWidthForSchedule())
	},
	onHeaderContainerResize: function() {
		this.timeAxisViewModel.setAvailableWidth(this.getAvailableWidthForSchedule());
		this.headerView.render()
	}
});
Ext.define("Sch.column.timeAxis.Vertical", {
	extend: "Ext.grid.column.Column",
	alias: "widget.verticaltimeaxis",
	align: "right",
	draggable: false,
	groupable: false,
	hideable: false,
	sortable: false,
	menuDisabled: true,
	timeAxis: null,
	timeAxisViewModel: null,
	cellTopBorderWidth: null,
	cellBottomBorderWidth: null,
	totalBorderWidth: null,
	initComponent: function() {
		this.callParent(arguments);
		this.tdCls = (this.tdCls || "") + " sch-verticaltimeaxis-cell";
		this.scope = this;
		this.totalBorderWidth = this.cellTopBorderWidth + this.cellBottomBorderWidth
	},
	afterRender: function() {
		this.callParent(arguments);
		var a = this.up("panel");
		a.getView().on("resize", this.onContainerResize, this)
	},
	onContainerResize: function(c, b, a) {
		this.timeAxisViewModel.update(a - 21)
	},
	renderer: function(e, c, a, f) {
		var b = this.timeAxis.headerConfig,
		d = b.bottom || b.middle;
		c.style = "height:" + (this.timeAxisViewModel.getTickWidth() - this.totalBorderWidth) + "px";
		if (d.renderer) {
			return d.renderer.call(d.scope || this, a.data.start, a.data.end, c, f)
		} else {
			return Ext.Date.format(a.data.start, d.dateFormat)
		}
	}
});
Ext.define("Sch.mixin.Lockable", {
	extend: "Ext.grid.locking.Lockable",
	useSpacer: true,
	syncRowHeight: false,
	injectLockable: function() {
		var j = this;
		var h = Ext.data.TreeStore && j.store instanceof Ext.data.TreeStore;
		var c = j.getEventSelectionModel ? j.getEventSelectionModel() : j.getSelectionModel();
		j.lockedGridConfig = Ext.apply({},
		j.lockedGridConfig || {});
		j.normalGridConfig = Ext.apply({},
		j.schedulerConfig || j.normalGridConfig || {});
		if (j.lockedXType) {
			j.lockedGridConfig.xtype = j.lockedXType
		}
		if (j.normalXType) {
			j.normalGridConfig.xtype = j.normalXType
		}
		var a = j.lockedGridConfig,
		i = j.normalGridConfig;
		Ext.applyIf(j.lockedGridConfig, {
			useArrows: true,
			trackMouseOver: false,
			split: true,
			animCollapse: false,
			collapseDirection: "left",
			region: "west"
		});
		Ext.applyIf(j.normalGridConfig, {
			viewType: j.viewType,
			layout: "fit",
			sortableColumns: false,
			enableColumnMove: false,
			enableColumnResize: false,
			enableColumnHide: false,
			getSchedulingView: function() {
				var m = typeof console !== "undefined" ? console: false;
				if (m && m.log) {
					m.log('getSchedulingView is deprecated on the inner grid panel. Instead use getView on the "normal" subgrid.')
				}
				return this.getView()
			},
			selModel: c,
			collapseDirection: "right",
			animCollapse: false,
			region: "center"
		});
		if (j.orientation === "vertical") {
			a.store = i.store = j.timeAxis
		}
		if (a.width) {
			j.syncLockedWidth = Ext.emptyFn;
			a.scroll = "horizontal";
			a.scrollerOwner = true
		}
		var e = j.lockedViewConfig = j.lockedViewConfig || {};
		var k = j.normalViewConfig = j.normalViewConfig || {};
		if (h) {
			var g = Ext.tree.View.prototype.onUpdate;
			e.onUpdate = function() {
				this.refreshSize = function() {
					var n = this,
					m = n.getBodySelector();
					if (m) {
						n.body.attach(n.el.child(m, true))
					}
				};
				Ext.suspendLayouts();
				g.apply(this, arguments);
				Ext.resumeLayouts();
				this.refreshSize = Ext.tree.View.prototype.refreshSize
			};
			e.store = k.store = j.store.nodeStore
		}
		var f = j.layout;
		var d = a.width;
		this.callParent(arguments);
		var l = j.lockedGrid.getView();
		var b = j.normalGrid.getView();
		if (d || f === "border") {
			if (d) {
				j.lockedGrid.setWidth(d)
			}
			b.addCls("sch-timeline-horizontal-scroll");
			l.addCls("sch-locked-horizontal-scroll")
		}
		if (j.normalGrid.collapsed) {
			j.normalGrid.collapsed = false;
			b.on("boxready",
			function() {
				j.normalGrid.collapse()
			},
			j, {
				delay: 10
			})
		}
		if (j.lockedGrid.collapsed) {
			if (l.bufferedRenderer) {
				l.bufferedRenderer.disabled = true
			}
		}
		if (Ext.getScrollbarSize().width === 0) {
			l.addCls("sch-ganttpanel-force-locked-scroll")
		}
		if (h) {
			this.setupLockableTree()
		}
		if (j.useSpacer) {
			b.on("refresh", j.updateSpacer, j);
			l.on("refresh", j.updateSpacer, j)
		}
		if (f !== "fit") {
			j.layout = f
		}
		if (l.store !== b.store) {
			Ext.Error.raise("Sch.mixin.Lockable setup failed, not sharing store between the two views")
		}
		if (b.bufferedRenderer) {
			this.lockedGrid.on("expand",
			function() {
				l.el.dom.scrollTop = b.el.dom.scrollTop
			});
			this.patchSubGrid(this.lockedGrid);
			this.patchSubGrid(this.normalGrid);
			this.patchBufferedRenderingPlugin(b.bufferedRenderer);
			this.patchBufferedRenderingPlugin(l.bufferedRenderer)
		}
	},
	setupLockableTree: function() {
		var c = this;
		var b = c.lockedGrid.getView();
		var a = Sch.mixin.FilterableTreeView.prototype;
		b.initTreeFiltering = a.initTreeFiltering;
		b.onFilterChangeStart = a.onFilterChangeStart;
		b.onFilterChangeEnd = a.onFilterChangeEnd;
		b.onFilterCleared = a.onFilterCleared;
		b.onFilterSet = a.onFilterSet;
		b.initTreeFiltering()
	},
	updateSpacer: function() {
		var g = this.lockedGrid.getView();
		var e = this.normalGrid.getView();
		if (g.rendered && e.rendered && g.el.child("table")) {
			var f = this,
			c = g.el,
			d = e.el.dom,
			b = c.dom.id + "-spacer",
			h = (d.offsetHeight - d.clientHeight) + "px";
			f.spacerEl = Ext.getDom(b);
			if (Ext.isIE6 || Ext.isIE7 || (Ext.isIEQuirks && Ext.isIE8) && f.spacerEl) {
				Ext.removeNode(f.spacerEl);
				f.spacerEl = null
			}
			if (f.spacerEl) {
				f.spacerEl.style.height = h
			} else {
				var a = c;
				Ext.core.DomHelper.append(a, {
					id: b,
					style: "height: " + h
				})
			}
		}
	},
	onLockedViewScroll: function() {
		this.callParent(arguments);
		var a = this.lockedGrid.getView().bufferedRenderer;
		if (a) {
			a.onViewScroll()
		}
	},
	onNormalViewScroll: function() {
		this.callParent(arguments);
		var a = this.normalGrid.getView().bufferedRenderer;
		if (a) {
			a.onViewScroll()
		}
	},
	patchSubGrid: function(a) {
		var b = a.getView().bufferedRenderer;
		a.on({
			collapse: function() {
				b.disabled = true
			},
			expand: function() {
				b.disabled = false
			}
		})
	},
	patchBufferedRenderingPlugin: function(c) {
		c.variableRowHeight = true;
		if (Ext.getVersion("extjs").isLessThan("4.2.1.883")) {
			c.view.on("afterrender",
			function() {
				c.view.el.un("scroll", c.onViewScroll, c)
			},
			this, {
				single: true,
				delay: 1
			});
			var b = c.stretchView;
			c.stretchView = function(e, d) {
				var g = this,
				f = (g.store.buffered ? g.store.getTotalCount() : g.store.getCount());
				if (f && (g.view.all.endIndex === f - 1)) {
					d = g.bodyTop + e.body.dom.offsetHeight
				}
				b.apply(this, [e, d])
			}
		} else {
			var a = c.enable;
			c.enable = function() {
				if (c.grid.collapsed) {
					return
				}
				return a.apply(this, arguments)
			}
		}
	},
	showMenuBy: function(b, f) {
		var e = this.getMenu(),
		c = e.down("#unlockItem"),
		d = e.down("#lockItem"),
		a = c.prev();
		a.hide();
		c.hide();
		d.hide()
	}
});
Ext.define("Sch.model.Customizable", {
	extend: "Ext.data.Model",
	idProperty: null,
	customizableFields: null,
	previous: null,
	onClassExtended: function(b, d, a) {
		var c = a.onBeforeCreated;
		a.onBeforeCreated = function(f, k) {
			c.call(this, f, k);
			var j = f.prototype;
			if (!j.customizableFields) {
				return
			}
			j.customizableFields = (f.superclass.customizableFields || []).concat(j.customizableFields);
			var g = j.customizableFields;
			var i = {};
			Ext.Array.each(g,
			function(l) {
				if (typeof l == "string") {
					l = {
						name: l
					}
				}
				i[l.name] = l
			});
			var e = j.fields;
			var h = [];
			e.each(function(l) {
				if (l.isCustomizableField) {
					h.push(l)
				}
			});
			e.removeAll(h);
			Ext.Object.each(i,
			function(l, o) {
				o.isCustomizableField = true;
				var p = o.name || o.getName();
				var t = p === "Id" ? "idProperty": p.charAt(0).toLowerCase() + p.substr(1) + "Field";
				var q = j[t];
				var s = q || p;
				if (e.containsKey(s)) {
					e.getByKey(s).isCustomizableField = true;
					g.push(new Ext.data.Field(Ext.applyIf({
						name: p,
						isCustomizableField: true
					},
					e.getByKey(s))))
				} else {
					e.add(new Ext.data.Field(Ext.applyIf({
						name: s,
						isCustomizableField: true
					},
					o)))
				}
				var n = Ext.String.capitalize(p);
				if (n != "Id") {
					var r = "get" + n;
					var m = "set" + n;
					if (!j[r] || j[r].__getterFor__ && j[r].__getterFor__ != s) {
						j[r] = function() {
							return this.data[s]
						};
						j[r].__getterFor__ = s
					}
					if (!j[m] || j[m].__setterFor__ && j[m].__setterFor__ != s) {
						j[m] = function(u) {
							return this.set(s, u)
						};
						j[m].__setterFor__ = s
					}
				}
			})
		}
	},
	set: function(d, b) {
		var a;
		this.previous = this.previous || {};
		if (arguments.length > 1) {
			a = this.get(d);
			if (a !== b) {
				this.previous[d] = a
			}
		} else {
			for (var c in d) {
				a = this.get(c);
				if (a !== d[c]) {
					this.previous[c] = a
				}
			}
		}
		this.callParent(arguments)
	},
	afterEdit: function() {
		this.callParent(arguments);
		delete this.previous
	},
	reject: function() {
		var b = this,
		a = b.modified,
		c;
		b.previous = b.previous || {};
		for (c in a) {
			if (a.hasOwnProperty(c)) {
				if (typeof a[c] != "function") {
					b.previous[c] = b.get(c)
				}
			}
		}
		b.callParent(arguments);
		delete b.previous
	}
});
Ext.define("Sch.model.Range", {
	extend: "Sch.model.Customizable",
	requires: ["Sch.util.Date"],
	idProperty: "Id",
	startDateField: "StartDate",
	endDateField: "EndDate",
	nameField: "Name",
	clsField: "Cls",
	customizableFields: [{
		name: "StartDate",
		type: "date",
		dateFormat: "c"
	},
	{
		name: "EndDate",
		type: "date",
		dateFormat: "c"
	},
	{
		name: "Cls",
		type: "string"
	},
	{
		name: "Name",
		type: "string"
	}],
	setStartDate: function(a, d) {
		var c = this.getEndDate();
		var b = this.getStartDate();
		this.set(this.startDateField, a);
		if (d === true && c && b) {
			this.setEndDate(Sch.util.Date.add(a, Sch.util.Date.MILLI, c - b))
		}
	},
	setEndDate: function(b, d) {
		var a = this.getStartDate();
		var c = this.getEndDate();
		this.set(this.endDateField, b);
		if (d === true && a && c) {
			this.setStartDate(Sch.util.Date.add(b, Sch.util.Date.MILLI, -(c - a)))
		}
	},
	setStartEndDate: function(b, a) {
		this.beginEdit();
		this.set(this.startDateField, b);
		this.set(this.endDateField, a);
		this.endEdit()
	},
	getDates: function() {
		var c = [],
		b = this.getEndDate();
		for (var a = Ext.Date.clearTime(this.getStartDate(), true); a < b; a = Sch.util.Date.add(a, Sch.util.Date.DAY, 1)) {
			c.push(a)
		}
		return c
	},
	forEachDate: function(b, a) {
		return Ext.each(this.getDates(), b, a)
	},
	isValid: function() {
		var b = this.callParent(arguments);
		if (b) {
			var c = this.getStartDate(),
			a = this.getEndDate();
			b = !c || !a || (a - c >= 0)
		}
		return b
	},
	shift: function(b, a) {
		this.setStartEndDate(Sch.util.Date.add(this.getStartDate(), b, a), Sch.util.Date.add(this.getEndDate(), b, a))
	}
});
Ext.define("Sch.model.TimeAxisTick", {
	extend: "Sch.model.Range",
	startDateField: "start",
	endDateField: "end"
});
Ext.define("Sch.model.Event", {
	extend: "Sch.model.Range",
	idProperty: "Id",
	config: {
		idProperty: "Id"
	},
	customizableFields: [{
		name: "Id"
	},
	{
		name: "ResourceId"
	},
	{
		name: "Draggable",
		type: "boolean",
		persist: false,
		defaultValue: true
	},
	{
		name: "Resizable",
		persist: false,
		defaultValue: true
	}],
	resourceIdField: "ResourceId",
	draggableField: "Draggable",
	resizableField: "Resizable",
	getResource: function(b) {
		if (this.stores && this.stores.length > 0) {
			var a = this.stores[0].resourceStore;
			b = b || this.get(this.resourceIdField);
			if (Ext.data.TreeStore && a instanceof Ext.data.TreeStore) {
				return a.getNodeById(b) || a.getRootNode().findChildBy(function(c) {
					return c.internalId === b
				})
			} else {
				return a.getById(b) || a.data.map[b]
			}
		}
		return null
	},
	setResource: function(a) {
		this.set(this.resourceIdField, (a instanceof Ext.data.Model) ? a.getId() || a.internalId: a)
	},
	assign: function(a) {
		this.setResource.apply(this, arguments)
	},
	unassign: function(a) {},
	isDraggable: function() {
		return this.getDraggable()
	},
	isAssignedTo: function(a) {
		return this.getResource() === a
	},
	isResizable: function() {
		return this.getResizable()
	},
	isPersistable: function() {
		var b = this.getResources();
		var a = true;
		Ext.each(b,
		function(c) {
			if (c.phantom) {
				a = false;
				return false
			}
		});
		return a
	},
	forEachResource: function(d, c) {
		var a = this.getResources();
		for (var b = 0; b < a.length; b++) {
			if (d.call(c || this, a[b]) === false) {
				return
			}
		}
	},
	getResources: function() {
		var a = this.getResource();
		return a ? [a] : []
	}
});
Ext.define("Sch.model.Resource", {
	extend: "Sch.model.Customizable",
	idProperty: "Id",
	config: {
		idProperty: "Id"
	},
	nameField: "Name",
	customizableFields: ["Id", {
		name: "Name",
		type: "string"
	}],
	getEventStore: function() {
		return this.stores[0] && this.stores[0].eventStore || this.parentNode && this.parentNode.getEventStore()
	},
	getEvents: function(d) {
		var c = [],
		e,
		f = this.getId() || this.internalId;
		d = d || this.getEventStore();
		for (var b = 0, a = d.getCount(); b < a; b++) {
			e = d.getAt(b);
			if (e.data[e.resourceIdField] === f) {
				c.push(e)
			}
		}
		return c
	}
});
Ext.define("Sch.data.mixin.EventStore", {
	model: "Sch.model.Event",
	config: {
		model: "Sch.model.Event"
	},
	requires: ["Sch.util.Date"],
	isEventStore: true,
	setResourceStore: function(a) {
		if (this.resourceStore) {
			this.resourceStore.un({
				beforesync: this.onResourceStoreBeforeSync,
				write: this.onResourceStoreWrite,
				scope: this
			})
		}
		this.resourceStore = a;
		if (a) {
			a.on({
				beforesync: this.onResourceStoreBeforeSync,
				write: this.onResourceStoreWrite,
				scope: this
			})
		}
	},
	onResourceStoreBeforeSync: function(b, c) {
		var a = b.create;
		if (a) {
			for (var e, d = a.length - 1; d >= 0; d--) {
				e = a[d];
				e._phantomId = e.internalId
			}
		}
	},
	onResourceStoreWrite: function(c, b) {
		if (b.wasSuccessful()) {
			var d = this,
			a = b.getRecords();
			Ext.each(a,
			function(e) {
				if (e._phantomId && !e.phantom) {
					d.each(function(f) {
						if (f.getResourceId() === e._phantomId) {
							f.assign(e)
						}
					})
				}
			})
		}
	},
	isDateRangeAvailable: function(f, a, b, d) {
		var c = true,
		e = Sch.util.Date;
		this.forEachScheduledEvent(function(h, g, i) {
			if (e.intersectSpans(f, a, g, i) && d === h.getResource() && (!b || b !== h)) {
				c = false;
				return false
			}
		});
		return c
	},
	getEventsInTimeSpan: function(d, b, a) {
		if (a !== false) {
			var c = Sch.util.Date;
			return this.queryBy(function(g) {
				var f = g.getStartDate(),
				e = g.getEndDate();
				return f && e && c.intersectSpans(f, e, d, b)
			})
		} else {
			return this.queryBy(function(g) {
				var f = g.getStartDate(),
				e = g.getEndDate();
				return f && e && (f - d >= 0) && (b - e >= 0)
			})
		}
	},
	forEachScheduledEvent: function(b, a) {
		this.each(function(e) {
			var d = e.getStartDate(),
			c = e.getEndDate();
			if (d && c) {
				return b.call(a || this, e, d, c)
			}
		},
		this)
	},
	getTotalTimeSpan: function() {
		var a = new Date(9999, 0, 1),
		b = new Date(0),
		c = Sch.util.Date;
		this.each(function(d) {
			if (d.getStartDate()) {
				a = c.min(d.getStartDate(), a)
			}
			if (d.getEndDate()) {
				b = c.max(d.getEndDate(), b)
			}
		});
		a = a < new Date(9999, 0, 1) ? a: null;
		b = b > new Date(0) ? b: null;
		return {
			start: a || null,
			end: b || a || null
		}
	},
	getEventsForResource: function(e) {
		var c = [],
		d,
		f = e.getId() || e.internalId;
		for (var b = 0, a = this.getCount(); b < a; b++) {
			d = this.getAt(b);
			if (d.data[d.resourceIdField] == f) {
				c.push(d)
			}
		}
		return c
	},
	append: function(a) {
		throw "Must be implemented by consuming class"
	}
});
Ext.define("Sch.data.EventStore", {
	extend: "Ext.data.Store",
	model: "Sch.model.Event",
	config: {
		model: "Sch.model.Event"
	},
	mixins: ["Sch.data.mixin.EventStore"],
	getByInternalId: function(a) {
		return this.data.getByKey(a)
	},
	append: function(a) {
		this.add(a)
	}
});
Ext.define("Sch.data.mixin.ResourceStore", {});
Ext.define("Sch.data.FilterableNodeStore", {
	extend: "Ext.data.NodeStore",
	onNodeExpand: function(f, d, c) {
		var b = [];
		for (var e = 0; e < d.length; e++) {
			var a = d[e];
			if (! (a.isHidden && a.isHidden() || a.hidden || a.data.hidden)) {
				b[b.length] = a
			}
		}
		return this.callParent([f, b, c])
	}
});
Ext.define("Sch.data.mixin.FilterableTreeStore", {
	requires: ["Sch.data.FilterableNodeStore"],
	nodeStoreClassName: "Sch.data.FilterableNodeStore",
	nodeStore: null,
	isFilteredFlag: false,
	lastTreeFilter: null,
	initTreeFiltering: function() {
		if (!this.nodeStore) {
			this.nodeStore = this.createNodeStore(this)
		}
		this.addEvents("filter-set", "filter-clear", "nodestore-datachange-start", "nodestore-datachange-end")
	},
	createNodeStore: function(a) {
		return Ext.create(this.nodeStoreClassName, {
			treeStore: a,
			recursive: true,
			rootVisible: this.rootVisible
		})
	},
	clearTreeFilter: function() {
		if (!this.isTreeFiltered()) {
			return
		}
		this.refreshNodeStoreContent();
		this.isFilteredFlag = false;
		this.lastTreeFilter = null;
		this.fireEvent("filter-clear", this)
	},
	refreshNodeStoreContent: function(f) {
		var a = this.getRootNode(),
		d = [];
		var c = this.rootVisible;
		var b = function(i) {
			if (i.isHidden && i.isHidden() || i.hidden || i.data.hidden) {
				return
			}
			if (c || i != a) {
				d[d.length] = i
			}
			if (!i.data.leaf && i.isExpanded()) {
				var j = i.childNodes,
				h = j.length;
				for (var g = 0; g < h; g++) {
					b(j[g])
				}
			}
		};
		b(a);
		this.fireEvent("nodestore-datachange-start", this);
		var e = this.nodeStore;
		if (!this.loadDataInNodeStore || !this.loadDataInNodeStore(d)) {
			e.loadRecords(d)
		}
		if (!f) {
			e.fireEvent("clear", e)
		}
		this.fireEvent("nodestore-datachange-end", this)
	},
	getIndexInTotalDataset: function(b) {
		var a = this.getRootNode(),
		d = -1;
		var e = this.rootVisible;
		if (!e && b == a) {
			return - 1
		}
		var c = function(h) {
			if (h.isHidden && h.isHidden() || h.hidden || h.data.hidden) {
				if (h == b) {
					return false
				}
			}
			if (e || h != a) {
				d++
			}
			if (h == b) {
				return false
			}
			if (!h.data.leaf && h.isExpanded()) {
				var i = h.childNodes,
				g = i.length;
				for (var f = 0; f < g; f++) {
					if (c(i[f]) === false) {
						return false
					}
				}
			}
		};
		c(a);
		return d
	},
	isTreeFiltered: function() {
		return this.isFilteredFlag
	},
	filterTreeBy: function(s, b) {
		var g;
		if (arguments.length == 1 && Ext.isObject(arguments[0])) {
			b = s.scope;
			g = s.filter
		} else {
			g = s;
			s = {
				filter: g
			}
		}
		this.fireEvent("nodestore-datachange-start", this);
		s = s || {};
		var j = s.shallow;
		var r = s.checkParents || j;
		var h = s.fullMathchingParents;
		var c = s.onlyParents || h;
		var e = this.rootVisible;
		if (c && r) {
			throw new Error("Can't combine `onlyParents` and `checkParents` options")
		}
		var o = {};
		var m = this.getRootNode(),
		d = [];
		var a = function(t) {
			var i = t.parentNode;
			while (i && !o[i.internalId]) {
				o[i.internalId] = true;
				i = i.parentNode
			}
		};
		var k = function(v) {
			if (v.isHidden && v.isHidden() || v.hidden || v.data.hidden) {
				return
			}
			var t,
			w,
			u,
			i;
			if (v.data.leaf) {
				if (g.call(b, v, o)) {
					d[d.length] = v;
					a(v)
				}
			} else {
				if (e || v != m) {
					d[d.length] = v
				}
				if (c) {
					t = g.call(b, v);
					w = v.childNodes;
					u = w.length;
					if (t) {
						o[v.internalId] = true;
						a(v);
						if (h) {
							v.cascadeBy(function(x) {
								if (x != v) {
									d[d.length] = x;
									if (!x.data.leaf) {
										o[x.internalId] = true
									}
								}
							});
							return
						}
					}
					for (i = 0; i < u; i++) {
						if (t && w[i].data.leaf) {
							d[d.length] = w[i]
						} else {
							if (!w[i].data.leaf) {
								k(w[i])
							}
						}
					}
				} else {
					if (r) {
						t = g.call(b, v, o);
						if (t) {
							o[v.internalId] = true;
							a(v)
						}
					}
					if (!r || !j || j && (t || v == m && !e)) {
						w = v.childNodes;
						u = w.length;
						for (i = 0; i < u; i++) {
							k(w[i])
						}
					}
				}
			}
		};
		k(m);
		var f = [];
		for (var p = 0, q = d.length; p < q; p++) {
			var l = d[p];
			if (l.data.leaf || o[l.internalId]) {
				f[f.length] = l
			}
		}
		var n = this.nodeStore;
		if (!this.loadDataInNodeStore || !this.loadDataInNodeStore(f)) {
			n.loadRecords(f, false);
			n.fireEvent("clear", n)
		}
		this.isFilteredFlag = true;
		this.lastTreeFilter = s;
		this.fireEvent("nodestore-datachange-end", this);
		this.fireEvent("filter-set", this)
	},
	hideNodesBy: function(b, a) {
		if (this.isFiltered()) {
			throw new Error("Can't hide nodes of the filtered tree store")
		}
		var c = this;
		a = a || this;
		this.getRootNode().cascadeBy(function(d) {
			d.hidden = b.call(a, d, c)
		});
		this.refreshNodeStoreContent()
	},
	showAllNodes: function() {
		this.getRootNode().cascadeBy(function(a) {
			a.hidden = a.data.hidden = false
		});
		this.refreshNodeStoreContent()
	}
});
Ext.define("Sch.data.ResourceStore", {
	extend: "Ext.data.Store",
	model: "Sch.model.Resource",
	config: {
		model: "Sch.model.Resource"
	},
	mixins: ["Sch.data.mixin.ResourceStore"]
});
Ext.define("Sch.data.ResourceTreeStore", {
	extend: "Ext.data.TreeStore",
	model: "Sch.model.Resource",
	mixins: ["Sch.data.mixin.ResourceStore", "Sch.data.mixin.FilterableTreeStore"],
	constructor: function() {
		this.callParent(arguments);
		this.initTreeFiltering()
	}
});
Ext.define("Sch.data.TimeAxis", {
	extend: "Ext.data.JsonStore",
	requires: ["Sch.util.Date"],
	model: "Sch.model.TimeAxisTick",
	continuous: true,
	autoAdjust: true,
	preset: null,
	unit: null,
	increment: null,
	resolutionUnit: null,
	resolutionIncrement: null,
	weekStartDay: null,
	mainUnit: null,
	shiftUnit: null,
	headerConfig: null,
	shiftIncrement: 1,
	defaultSpan: 1,
	constructor: function(a) {
		var b = this;
		if (b.setModel) {
			b.setModel(b.model)
		}
		b.originalContinuous = b.continuous;
		b.callParent(arguments);
		b.addEvents("beforereconfigure", "reconfigure");
		b.on("datachanged",
		function() {
			b.fireEvent("reconfigure", b)
		});
		if (a && b.start) {
			b.reconfigure(a)
		}
	},
	reconfigure: function(a) {
		Ext.apply(this, a);
		var b = this.generateTicks(this.start, this.end, this.unit, this.increment || 1, this.mainUnit);
		if (this.fireEvent("beforereconfigure", this, this.start, this.end) !== false) {
			this.removeAll(true);
			this.suspendEvents();
			this.add(b);
			if (this.getCount() === 0) {
				Ext.Error.raise("Invalid time axis configuration or filter, please check your input data.")
			}
			this.resumeEvents();
			this.fireEvent("datachanged", this);
			this.fireEvent("refresh", this)
		}
	},
	setTimeSpan: function(c, a) {
		var b = this.getAdjustedDates(c, a);
		if (this.getStart() - b.start !== 0 || this.getEnd() - b.end !== 0) {
			this.reconfigure({
				start: c,
				end: a
			})
		}
	},
	filterBy: function(b, a) {
		this.continuous = false;
		a = a || this;
		this.clearFilter(true);
		this.suspendEvents(true);
		this.filter([{
			filterFn: function(d, c) {
				return b.call(a, d.data, c)
			}
		}]);
		if (this.getCount() === 0) {
			Ext.Error.raise("Invalid time axis filter - no columns passed through the filter. Please check your filter method.");
			this.clearFilter();
			this.resumeEvents();
			Ext.Error.raise("Invalid time axis filter - no ticks passed through the filter. Please check your filter method.");
			return
		}
		this.resumeEvents()
	},
	isContinuous: function() {
		return this.continuous && !this.isFiltered()
	},
	clearFilter: function() {
		this.continuous = this.originalContinuous;
		this.callParent(arguments)
	},
	generateTicks: function(a, d, g, i) {
		var h = [],
		f,
		b = Sch.util.Date,
		e = 0;
		g = g || this.unit;
		i = i || this.increment;
		if (this.autoAdjust) {
			var j = this.getAdjustedDates(a, d);
			a = j.start;
			d = j.end
		}
		while (a < d) {
			f = this.getNext(a, g, i);
			if (g === b.HOUR && i > 1 && h.length > 0 && e === 0) {
				var c = h[h.length - 1];
				e = ((c.start.getHours() + i) % 24) - c.end.getHours();
				if (e !== 0) {
					f = b.add(f, b.HOUR, e)
				}
			}
			h.push({
				start: a,
				end: f
			});
			a = f
		}
		return h
	},
	getAdjustedDates: function(b, a) {
		if (this.autoAdjust) {
			b = this.floorDate(b || this.getStart(), false);
			a = this.ceilDate(a || Sch.util.Date.add(b, this.mainUnit, this.defaultSpan), false)
		}
		return {
			start: b,
			end: a
		}
	},
	getTickFromDate: function(c) {
		if (this.getStart() > c || this.getEnd() < c) {
			return - 1
		}
		var f = this.getRange(),
		e,
		a,
		d,
		b;
		for (d = 0, b = f.length; d < b; d++) {
			a = f[d].data.end;
			if (c <= a) {
				e = f[d].data.start;
				return d + (c > e ? (c - e) / (a - e) : 0)
			}
		}
		return - 1
	},
	getDateFromTick: function(d, f) {
		var g = this.getCount();
		if (d === g) {
			return this.getEnd()
		}
		var a = Math.floor(d),
		e = d - a,
		c = this.getAt(a).data;
		var b = Sch.util.Date.add(c.start, Sch.util.Date.MILLI, e * (c.end - c.start));
		if (f) {
			b = this[f + "Date"](b)
		}
		return b
	},
	getTicks: function() {
		var a = [];
		this.each(function(b) {
			a.push(b.data)
		});
		return a
	},
	getStart: function() {
		var a = this.first();
		if (a) {
			return Ext.Date.clone(a.data.start)
		}
		return null
	},
	getEnd: function() {
		var a = this.last();
		if (a) {
			return Ext.Date.clone(a.data.end)
		}
		return null
	},
	floorDate: function(t, d, v) {
		d = d !== false;
		var n = Ext.Date.clone(t),
		b = d ? this.getStart() : null,
		u = this.resolutionIncrement,
		k;
		if (v) {
			k = v
		} else {
			k = d ? this.resolutionUnit: this.mainUnit
		}
		switch (k) {
		case Sch.util.Date.MILLI:
			if (d) {
				var f = Sch.util.Date.getDurationInMilliseconds(b, n),
				e = Math.floor(f / u) * u;
				n = Sch.util.Date.add(b, Sch.util.Date.MILLI, e)
			}
			break;
		case Sch.util.Date.SECOND:
			if (d) {
				var j = Sch.util.Date.getDurationInSeconds(b, n),
				s = Math.floor(j / u) * u;
				n = Sch.util.Date.add(b, Sch.util.Date.MILLI, s * 1000)
			} else {
				n.setMilliseconds(0)
			}
			break;
		case Sch.util.Date.MINUTE:
			if (d) {
				var p = Sch.util.Date.getDurationInMinutes(b, n),
				a = Math.floor(p / u) * u;
				n = Sch.util.Date.add(b, Sch.util.Date.SECOND, a * 60)
			} else {
				n.setSeconds(0);
				n.setMilliseconds(0)
			}
			break;
		case Sch.util.Date.HOUR:
			if (d) {
				var o = Sch.util.Date.getDurationInHours(this.getStart(), n),
				l = Math.floor(o / u) * u;
				n = Sch.util.Date.add(b, Sch.util.Date.MINUTE, l * 60)
			} else {
				n.setMinutes(0);
				n.setSeconds(0);
				n.setMilliseconds(0)
			}
			break;
		case Sch.util.Date.DAY:
			if (d) {
				var c = Sch.util.Date.getDurationInDays(b, n),
				g = Math.floor(c / u) * u;
				n = Sch.util.Date.add(b, Sch.util.Date.DAY, g)
			} else {
				Ext.Date.clearTime(n)
			}
			break;
		case Sch.util.Date.WEEK:
			var r = n.getDay();
			Ext.Date.clearTime(n);
			if (r !== this.weekStartDay) {
				n = Sch.util.Date.add(n, Sch.util.Date.DAY, -(r > this.weekStartDay ? (r - this.weekStartDay) : (7 - r - this.weekStartDay)))
			}
			break;
		case Sch.util.Date.MONTH:
			if (d) {
				var q = Sch.util.Date.getDurationInMonths(b, n),
				i = Math.floor(q / u) * u;
				n = Sch.util.Date.add(b, Sch.util.Date.MONTH, i)
			} else {
				Ext.Date.clearTime(n);
				n.setDate(1)
			}
			break;
		case Sch.util.Date.QUARTER:
			Ext.Date.clearTime(n);
			n.setDate(1);
			n = Sch.util.Date.add(n, Sch.util.Date.MONTH, -(n.getMonth() % 3));
			break;
		case Sch.util.Date.YEAR:
			if (d) {
				var m = Sch.util.Date.getDurationInYears(b, n),
				h = Math.floor(m / u) * u;
				n = Sch.util.Date.add(b, Sch.util.Date.YEAR, h)
			} else {
				n = new Date(t.getFullYear(), 0, 1)
			}
			break
		}
		return n
	},
	roundDate: function(r) {
		var l = Ext.Date.clone(r),
		b = this.getStart(),
		s = this.resolutionIncrement;
		switch (this.resolutionUnit) {
		case Sch.util.Date.MILLI:
			var e = Sch.util.Date.getDurationInMilliseconds(b, l),
			d = Math.round(e / s) * s;
			l = Sch.util.Date.add(b, Sch.util.Date.MILLI, d);
			break;
		case Sch.util.Date.SECOND:
			var i = Sch.util.Date.getDurationInSeconds(b, l),
			q = Math.round(i / s) * s;
			l = Sch.util.Date.add(b, Sch.util.Date.MILLI, q * 1000);
			break;
		case Sch.util.Date.MINUTE:
			var n = Sch.util.Date.getDurationInMinutes(b, l),
			a = Math.round(n / s) * s;
			l = Sch.util.Date.add(b, Sch.util.Date.SECOND, a * 60);
			break;
		case Sch.util.Date.HOUR:
			var m = Sch.util.Date.getDurationInHours(this.getStart(), l),
			j = Math.round(m / s) * s;
			l = Sch.util.Date.add(b, Sch.util.Date.MINUTE, j * 60);
			break;
		case Sch.util.Date.DAY:
			var c = Sch.util.Date.getDurationInDays(b, l),
			f = Math.round(c / s) * s;
			l = Sch.util.Date.add(b, Sch.util.Date.DAY, f);
			break;
		case Sch.util.Date.WEEK:
			Ext.Date.clearTime(l);
			var o = l.getDay() - this.weekStartDay,
			t;
			if (o < 0) {
				o = 7 + o
			}
			if (Math.round(o / 7) === 1) {
				t = 7 - o
			} else {
				t = -o
			}
			l = Sch.util.Date.add(l, Sch.util.Date.DAY, t);
			break;
		case Sch.util.Date.MONTH:
			var p = Sch.util.Date.getDurationInMonths(b, l) + (l.getDate() / Ext.Date.getDaysInMonth(l)),
			h = Math.round(p / s) * s;
			l = Sch.util.Date.add(b, Sch.util.Date.MONTH, h);
			break;
		case Sch.util.Date.QUARTER:
			Ext.Date.clearTime(l);
			l.setDate(1);
			l = Sch.util.Date.add(l, Sch.util.Date.MONTH, 3 - (l.getMonth() % 3));
			break;
		case Sch.util.Date.YEAR:
			var k = Sch.util.Date.getDurationInYears(b, l),
			g = Math.round(k / s) * s;
			l = Sch.util.Date.add(b, Sch.util.Date.YEAR, g);
			break
		}
		return l
	},
	ceilDate: function(c, b, f) {
		var e = Ext.Date.clone(c);
		b = b !== false;
		var a = b ? this.resolutionIncrement: 1,
		g = false,
		d;
		if (f) {
			d = f
		} else {
			d = b ? this.resolutionUnit: this.mainUnit
		}
		switch (d) {
		case Sch.util.Date.HOUR:
			if (e.getMinutes() > 0 || e.getSeconds() > 0 || e.getMilliseconds() > 0) {
				g = true
			}
			break;
		case Sch.util.Date.DAY:
			if (e.getHours() > 0 || e.getMinutes() > 0 || e.getSeconds() > 0 || e.getMilliseconds() > 0) {
				g = true
			}
			break;
		case Sch.util.Date.WEEK:
			Ext.Date.clearTime(e);
			if (e.getDay() !== this.weekStartDay) {
				g = true
			}
			break;
		case Sch.util.Date.MONTH:
			Ext.Date.clearTime(e);
			if (e.getDate() !== 1) {
				g = true
			}
			break;
		case Sch.util.Date.QUARTER:
			Ext.Date.clearTime(e);
			if (e.getMonth() % 3 !== 0) {
				g = true
			}
			break;
		case Sch.util.Date.YEAR:
			Ext.Date.clearTime(e);
			if (e.getMonth() !== 0 || e.getDate() !== 1) {
				g = true
			}
			break;
		default:
			break
		}
		if (g) {
			return this.getNext(e, d, a)
		} else {
			return e
		}
	},
	getNext: function(b, c, a) {
		return Sch.util.Date.getNext(b, c, a, this.weekStartDay)
	},
	getResolution: function() {
		return {
			unit: this.resolutionUnit,
			increment: this.resolutionIncrement
		}
	},
	setResolution: function(b, a) {
		this.resolutionUnit = b;
		this.resolutionIncrement = a || 1
	},
	shift: function(a, b) {
		this.setTimeSpan(Sch.util.Date.add(this.getStart(), b, a), Sch.util.Date.add(this.getEnd(), b, a))
	},
	shiftNext: function(a) {
		a = a || this.getShiftIncrement();
		var b = this.getShiftUnit();
		this.setTimeSpan(Sch.util.Date.add(this.getStart(), b, a), Sch.util.Date.add(this.getEnd(), b, a))
	},
	shiftPrevious: function(a) {
		a = -(a || this.getShiftIncrement());
		var b = this.getShiftUnit();
		this.setTimeSpan(Sch.util.Date.add(this.getStart(), b, a), Sch.util.Date.add(this.getEnd(), b, a))
	},
	getShiftUnit: function() {
		return this.shiftUnit || this.getMainUnit()
	},
	getShiftIncrement: function() {
		return this.shiftIncrement || 1
	},
	getUnit: function() {
		return this.unit
	},
	getIncrement: function() {
		return this.increment
	},
	dateInAxis: function(a) {
		return Sch.util.Date.betweenLesser(a, this.getStart(), this.getEnd())
	},
	timeSpanInAxis: function(b, a) {
		if (this.isContinuous()) {
			return Sch.util.Date.intersectSpans(b, a, this.getStart(), this.getEnd())
		} else {
			return (b < this.getStart() && a > this.getEnd()) || this.getTickFromDate(b) !== this.getTickFromDate(a)
		}
	},
	forEachInterval: function(b, a, c) {
		c = c || this;
		if (!this.headerConfig) {
			return
		}
		if (b === "top" || (b === "middle" && this.headerConfig.bottom)) {
			this.forEachAuxInterval(b, a, c)
		} else {
			this.each(function(e, d) {
				return a.call(c, e.data.start, e.data.end, d)
			})
		}
	},
	forEachMainInterval: function(a, b) {
		this.forEachInterval("middle", a, b)
	},
	forEachAuxInterval: function(b, a, f) {
		f = f || this;
		var c = this.getEnd(),
		g = this.getStart(),
		e = 0,
		d;
		if (g > c) {
			throw "Invalid time axis configuration"
		}
		while (g < c) {
			d = Sch.util.Date.min(this.getNext(g, this.headerConfig[b].unit, this.headerConfig[b].increment || 1), c);
			a.call(f, g, d, e);
			g = d;
			e++
		}
	}
});
Ext.define("Sch.view.Horizontal", {
	requires: ["Ext.util.Region", "Ext.Element", "Sch.util.Date"],
	view: null,
	constructor: function(a) {
		Ext.apply(this, a)
	},
	translateToScheduleCoordinate: function(a) {
		var b = this.view;
		if (b.rtl) {
			return b.getTimeAxisColumn().getEl().getRight() - a
		}
		return a - b.getEl().getX() + b.getScroll().left
	},
	translateToPageCoordinate: function(a) {
		var b = this.view;
		return a + b.getEl().getX() - b.getScroll().left
	},
	getEventRenderData: function(a, b, c) {
		var h = b || a.getStartDate(),
		g = c || a.getEndDate() || h,
		j = this.view,
		f = j.timeAxis.getStart(),
		k = j.timeAxis.getEnd(),
		i = Math,
		e = j.getXFromDate(Sch.util.Date.max(h, f)),
		l = j.getXFromDate(Sch.util.Date.min(g, k)),
		d = {};
		if (this.view.rtl) {
			d.right = i.min(e, l)
		} else {
			d.left = i.min(e, l)
		}
		d.width = i.max(1, i.abs(l - e)) - j.eventBorderWidth;
		if (j.managedEventSizing) {
			d.top = i.max(0, (j.barMargin - ((Ext.isIE && !Ext.isStrict) ? 0: j.eventBorderWidth - j.cellTopBorderWidth)));
			d.height = j.rowHeight - (2 * j.barMargin) - j.eventBorderWidth
		}
		d.start = h;
		d.end = g;
		d.startsOutsideView = h < f;
		d.endsOutsideView = g > k;
		return d
	},
	getScheduleRegion: function(e, g) {
		var c = Ext.Element.prototype.getRegion ? "getRegion": "getPageBox",
		j = this.view,
		i = e ? Ext.fly(j.getRowNode(e))[c]() : j.getTableRegion(),
		f = j.timeAxis.getStart(),
		l = j.timeAxis.getEnd(),
		b = j.getDateConstraints(e, g) || {
			start: f,
			end: l
		},
		d = this.translateToPageCoordinate(j.getXFromDate(b.start)),
		k = this.translateToPageCoordinate(j.getXFromDate(b.end)),
		h = i.top + j.barMargin,
		a = i.bottom - j.barMargin - j.eventBorderWidth;
		return new Ext.util.Region(h, Math.max(d, k), a, Math.min(d, k))
	},
	getResourceRegion: function(j, e, i) {
		var m = this.view,
		d = m.getRowNode(j),
		f = Ext.fly(d).getOffsetsTo(m.getEl()),
		k = m.timeAxis.getStart(),
		o = m.timeAxis.getEnd(),
		c = e ? Sch.util.Date.max(k, e) : k,
		g = i ? Sch.util.Date.min(o, i) : o,
		h = m.getXFromDate(c),
		n = m.getXFromDate(g),
		l = f[1] + m.cellTopBorderWidth,
		a = f[1] + Ext.fly(d).getHeight() - m.cellBottomBorderWidth;
		if (!Ext.versions.touch) {
			var b = m.getScroll();
			l += b.top;
			a += b.top
		}
		return new Ext.util.Region(l, Math.max(h, n), a, Math.min(h, n))
	},
	columnRenderer: function(d, q, k, n, p) {
		var o = this.view;
		var b = o.eventStore.getEventsForResource(k);
		if (b.length === 0) {
			return
		}
		var h = o.timeAxis,
		m = [],
		g,
		e;
		for (g = 0, e = b.length; g < e; g++) {
			var a = b[g],
			c = a.getStartDate(),
			f = a.getEndDate();
			if (c && f && h.timeSpanInAxis(c, f)) {
				m[m.length] = o.generateTplData(a, k, n)
			}
		}
		if (o.dynamicRowHeight) {
			var j = o.eventLayout.horizontal;
			j.applyLayout(m, k);
			q.rowHeight = j.getRowHeight(k, b)
		}
		return o.eventTpl.apply(m)
	},
	resolveResource: function(b) {
		var a = this.view;
		var c = a.findRowByChild(b);
		if (c) {
			return a.getRecordForRowNode(c)
		}
		return null
	},
	getTimeSpanRegion: function(b, h, g) {
		var d = this.view,
		c = d.getXFromDate(b),
		e = d.getXFromDate(h || b),
		a,
		f;
		if (!f) {
			f = d.getTableRegion()
		}
		if (g) {
			a = Math.max(f ? f.bottom - f.top: 0, d.getEl().dom.clientHeight)
		} else {
			a = f ? f.bottom - f.top: 0
		}
		return new Ext.util.Region(0, Math.max(c, e), a, Math.min(c, e))
	},
	getStartEndDatesFromRegion: function(c, b) {
		var a = this.view.getDateFromCoordinate(c.left, b),
		d = this.view.getDateFromCoordinate(c.right, b);
		if (d && a) {
			return {
				start: Sch.util.Date.min(a, d),
				end: Sch.util.Date.max(a, d)
			}
		}
		return null
	},
	onEventAdd: function(n, m) {
		var h = this.view;
		var e = {};
		for (var g = 0, c = m.length; g < c; g++) {
			var a = m[g].getResources();
			for (var f = 0, d = a.length; f < d; f++) {
				var b = a[f];
				e[b.getId()] = b
			}
		}
		Ext.Object.each(e,
		function(j, i) {
			h.repaintEventsForResource(i)
		})
	},
	onEventRemove: function(k, e) {
		var h = this.view;
		var j = this.resourceStore;
		var f = Ext.tree && Ext.tree.View && h instanceof Ext.tree.View;
		if (!Ext.isArray(e)) {
			e = [e]
		}
		var g = function(i) {
			if (h.store.indexOf(i) >= 0) {
				h.repaintEventsForResource(i)
			}
		};
		for (var d = 0; d < e.length; d++) {
			var a = e[d].getResources();
			if (a.length > 1) {
				Ext.each(a, g, this)
			} else {
				var b = h.getEventNodeByRecord(e[d]);
				if (b) {
					var c = h.resolveResource(b);
					if (Ext.Element.prototype.fadeOut) {
						Ext.get(b).fadeOut({
							callback: function() {
								g(c)
							}
						})
					} else {
						Ext.Anim.run(Ext.get(b), "fade", {
							out: true,
							duration: 500,
							after: function() {
								g(c)
							},
							autoClear: false
						})
					}
				}
			}
		}
	},
	onEventUpdate: function(c, d, b) {
		var e = d.previous;
		var a = this.view;
		if (e && e[d.resourceIdField]) {
			var f = d.getResource(e[d.resourceIdField]);
			if (f) {
				a.repaintEventsForResource(f, true)
			}
		}
		var g = d.getResources();
		Ext.each(g,
		function(h) {
			a.repaintEventsForResource(h, true)
		})
	},
	setColumnWidth: function(c, b) {
		var a = this.view;
		a.getTimeAxisViewModel().setTickWidth(c, b);
		a.fireEvent("columnwidthchange", a, c)
	},
	getVisibleDateRange: function() {
		var d = this.view;
		if (!d.getEl()) {
			return null
		}
		var c = d.getTableRegion(),
		b = d.timeAxis.getStart(),
		f = d.timeAxis.getEnd(),
		e = d.getWidth();
		if ((c.right - c.left) < e) {
			return {
				startDate: b,
				endDate: f
			}
		}
		var a = d.getScroll();
		return {
			startDate: d.getDateFromCoordinate(a.left, null, true),
			endDate: d.getDateFromCoordinate(a.left + e, null, true)
		}
	}
});
Ext.define("Sch.view.Vertical", {
	view: null,
	constructor: function(a) {
		Ext.apply(this, a)
	},
	translateToScheduleCoordinate: function(b) {
		var a = this.view;
		return b - a.el.getY() + a.el.getScroll().top
	},
	translateToPageCoordinate: function(d) {
		var b = this.view;
		var c = b.el,
		a = c.getScroll();
		return d + c.getY() - a.top
	},
	getEventRenderData: function(a) {
		var g = a.getStartDate(),
		f = a.getEndDate(),
		i = this.view,
		e = i.timeAxis.getStart(),
		j = i.timeAxis.getEnd(),
		h = Math,
		d = h.floor(i.getCoordinateFromDate(Sch.util.Date.max(g, e))),
		k = h.floor(i.getCoordinateFromDate(Sch.util.Date.min(f, j))),
		c = this.getResourceColumnWidth(a.getResource()),
		b;
		b = {
			top: h.max(0, h.min(d, k) - i.eventBorderWidth),
			height: h.max(1, h.abs(d - k))
		};
		if (i.managedEventSizing) {
			b.left = i.barMargin;
			b.width = c - (2 * i.barMargin) - i.eventBorderWidth
		}
		b.start = g;
		b.end = f;
		b.startsOutsideView = g < e;
		b.endsOutsideView = f > j;
		return b
	},
	getScheduleRegion: function(d, f) {
		var h = this.view,
		g = d ? Ext.fly(h.getCellByPosition({
			column: h.resourceStore.indexOf(d),
			row: 0
		})).getRegion() : h.getTableRegion(),
		e = h.timeAxis.getStart(),
		k = h.timeAxis.getEnd(),
		a = h.getDateConstraints(d, f) || {
			start: e,
			end: k
		},
		c = this.translateToPageCoordinate(h.getCoordinateFromDate(Sch.util.Date.min(e, a.start))),
		j = this.translateToPageCoordinate(h.getCoordinateFromDate(Sch.util.Date.max(k, a.end))),
		b = g.left + h.barMargin,
		i = (d ? (g.left + this.getResourceColumnWidth(d)) : g.right) - h.barMargin;
		return new Ext.util.Region(Math.min(c, j), i, Math.max(c, j), b)
	},
	getResourceColumnWidth: function(d) {
		var a = this.view,
		b = a.resourceStore.indexOf(d),
		c = a.headerCt.getGridColumns()[b];
		return c.rendered ? c.getWidth() : c.width
	},
	getResourceRegion: function(h, b, g) {
		var j = this.view,
		e = j.resourceStore.indexOf(h) * this.getResourceColumnWidth(h),
		i = j.timeAxis.getStart(),
		m = j.timeAxis.getEnd(),
		a = b ? Sch.util.Date.max(i, b) : i,
		d = g ? Sch.util.Date.min(m, g) : m,
		f = Math.max(0, j.getCoordinateFromDate(a) - j.cellTopBorderWidth),
		l = j.getCoordinateFromDate(d) - j.cellTopBorderWidth,
		c = e + j.cellBorderWidth,
		k = e + this.getResourceColumnWidth(h) - j.cellBorderWidth;
		return new Ext.util.Region(Math.min(f, l), k, Math.max(f, l), c)
	},
	columnRenderer: function(f, r, m, o, q) {
		var p = this.view;
		var e = "";
		if (o === 0) {
			var a = Sch.util.Date,
			k = p.timeAxis,
			n,
			c,
			j,
			g;
			n = [];
			c = p.eventStore.getEventsForResource(m);
			for (j = 0, g = c.length; j < g; j++) {
				var b = c[j],
				d = b.getStartDate(),
				h = b.getEndDate();
				if (d && h && k.timeSpanInAxis(d, h)) {
					n.push(p.generateTplData(b, m, q))
				}
			}
			p.eventLayout.vertical.applyLayout(n, this.getResourceColumnWidth(m));
			e = "&#160;" + p.eventTpl.apply(n);
			if (Ext.isIE) {
				r.tdAttr = 'style="z-index:1000"'
			}
		}
		if (q % 2 === 1) {
			r.tdCls += " " + p.altColCls
		}
		return e
	},
	resolveResource: function(b) {
		var a = this.view;
		b = Ext.fly(b).is(a.cellSelector) ? b: Ext.fly(b).up(a.cellSelector);
		if (b) {
			var c = a.getHeaderByCell(b.dom ? b.dom: b);
			if (c) {
				return a.resourceStore.getAt(a.headerCt.getHeaderIndex(c))
			}
		}
		return null
	},
	onEventUpdate: function(b, c) {
		this.renderSingle.call(this, c);
		var a = this.view;
		var d = c.previous;
		if (d && d[c.resourceIdField]) {
			var e = c.getResource(d[c.resourceIdField]);
			this.relayoutRenderedEvents(e)
		}
		this.relayoutRenderedEvents(c.getResource());
		if (a.getSelectionModel().isSelected(c)) {
			a.onEventSelect(c, true)
		}
	},
	onEventAdd: function(b, c) {
		var a = this.view;
		if (c.length === 1) {
			this.renderSingle(c[0]);
			this.relayoutRenderedEvents(c[0].getResource())
		} else {
			a.repaintEventsForResource(a.store.first())
		}
	},
	onEventRemove: function(b, c) {
		var a = this.view;
		if (c.length === 1) {
			this.relayoutRenderedEvents(this.getResourceByEventRecord(c[0]))
		} else {
			a.repaintEventsForResource(a.store.first())
		}
	},
	relayoutRenderedEvents: function(h) {
		var g = [],
		b = this.view,
		d,
		a,
		f,
		e,
		c = b.eventStore.getEventsForResource(h);
		if (c.length > 0) {
			for (d = 0, a = c.length; d < a; d++) {
				f = c[d];
				e = b.getEventNodeByRecord(f);
				if (e) {
					g.push({
						start: f.getStartDate(),
						end: f.getEndDate(),
						id: e.id
					})
				}
			}
			b.eventLayout.vertical.applyLayout(g, this.getResourceColumnWidth(h));
			for (d = 0; d < g.length; d++) {
				f = g[d];
				Ext.fly(f.id).setStyle({
					left: f.left + "px",
					width: f.width + "px"
				})
			}
		}
	},
	renderSingle: function(d) {
		var g = d.getResource();
		var a = this.view;
		var c = a.getEventNodeByRecord(d);
		var f = a.resourceStore.indexOf(g);
		if (c) {
			Ext.fly(c).remove()
		}
		var b = a.getCell(a.store.getAt(0), a.headerCt.getHeaderAtIndex(f)).first();
		var e = a.generateTplData(d, g, f);
		a.eventTpl.append(b, [e])
	},
	getTimeSpanRegion: function(b, g) {
		var d = this.view,
		a = d.getCoordinateFromDate(b),
		f = d.getCoordinateFromDate(g || b),
		c = d.getTableRegion(),
		e = c ? c.right - c.left: d.el.dom.clientWidth;
		return new Ext.util.Region(Math.min(a, f), e, Math.max(a, f), 0)
	},
	getStartEndDatesFromRegion: function(c, b) {
		var a = this.view.getDateFromCoordinate(c.top, b),
		d = this.view.getDateFromCoordinate(c.bottom, b);
		if (a && d) {
			return {
				start: Sch.util.Date.min(a, d),
				end: Sch.util.Date.max(a, d)
			}
		} else {
			return null
		}
	},
	setColumnWidth: function(c, b) {
		var a = this.view;
		if (a.panel) {
			a.panel.resourceColumnWidth = c
		}
		var d = a.headerCt;
		d.suspendLayout = true;
		d.items.each(function(e) {
			if (e.rendered) {
				e.minWidth = undefined;
				e.setWidth(c)
			}
		});
		d.suspendLayout = false;
		d.doLayout();
		if (!b) {
			a.refresh()
		}
		a.fireEvent("columnwidthchange", a, c)
	},
	getVisibleDateRange: function() {
		var e = this.view;
		if (!e.rendered) {
			return null
		}
		var c = e.getEl().getScroll(),
		b = e.getHeight(),
		d = e.getTableRegion(),
		f = e.timeAxis.getEnd();
		if (d.bottom - d.top < b) {
			var a = e.timeAxis.getStart();
			return {
				startDate: a,
				endDate: endDate
			}
		}
		return {
			startDate: e.getDateFromCoordinate(c.top, null, true),
			endDate: e.getDateFromCoordinate(c.top + b, null, true) || f
		}
	}
});
Ext.define("Sch.selection.EventModel", {
	extend: "Ext.selection.Model",
	alias: "selection.eventmodel",
	requires: ["Ext.util.KeyNav"],
	deselectOnContainerClick: true,
	constructor: function(a) {
		this.addEvents("beforedeselect", "beforeselect", "deselect", "select");
		this.callParent(arguments)
	},
	bindComponent: function(a) {
		var b = this,
		c = {
			refresh: b.refresh,
			scope: b
		};
		b.view = a;
		b.bindStore(a.getEventStore());
		a.on({
			eventclick: b.onEventClick,
			itemclick: b.onItemClick,
			scope: this
		});
		a.on(c)
	},
	onEventClick: function(b, a, c) {
		this.selectWithEvent(a, c)
	},
	onItemClick: function() {
		if (this.deselectOnContainerClick) {
			this.deselectAll()
		}
	},
	onSelectChange: function(d, b, j, a) {
		var f = this,
		g = f.view,
		h = f.store,
		e = b ? "select": "deselect",
		c = 0;
		if ((j || f.fireEvent("before" + e, f, d)) !== false && a() !== false) {
			if (b) {
				g.onEventSelect(d, j)
			} else {
				g.onEventDeselect(d, j)
			}
			if (!j) {
				f.fireEvent(e, f, d)
			}
		}
	},
	selectRange: Ext.emptyFn,
	selectNode: function(c, d, a) {
		var b = this.view.resolveEventRecord(c);
		if (b) {
			this.select(b, d, a)
		}
	},
	deselectNode: function(c, d, a) {
		var b = this.view.resolveEventRecord(c);
		if (b) {
			this.deselect(b, a)
		}
	}
});
Ext.define("Sch.plugin.Printable", {
	extend: "Ext.AbstractPlugin",
	alias: "plugin.scheduler_printable",
	lockableScope: "top",
	docType: "<!DOCTYPE HTML>",
	beforePrint: Ext.emptyFn,
	afterPrint: Ext.emptyFn,
	autoPrintAndClose: true,
	fakeBackgroundColor: true,
	scheduler: null,
	constructor: function(a) {
		Ext.apply(this, a)
	},
	init: function(a) {
		this.scheduler = a;
		a.print = Ext.Function.bind(this.print, this)
	},
	mainTpl: new Ext.XTemplate('{docType}<html class="' + Ext.baseCSSPrefix + 'border-box {htmlClasses}"><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type" /><title>{title}</title>{styles}</head><body class="sch-print-body {bodyClasses}"><div class="sch-print-ct {componentClasses}" style="width:{totalWidth}px"><div class="sch-print-headerbg" style="border-left-width:{totalWidth}px;height:{headerHeight}px;"></div><div class="sch-print-header-wrap">{[this.printLockedHeader(values)]}{[this.printNormalHeader(values)]}</div>{[this.printLockedGrid(values)]}{[this.printNormalGrid(values)]}</div><script type="text/javascript">{setupScript}<\/script></body></html>', {
		printLockedHeader: function(a) {
			var b = "";
			if (a.lockedGrid) {
				b += '<div style="left:-' + a.lockedScroll + "px;margin-right:-" + a.lockedScroll + "px;width:" + (a.lockedWidth + a.lockedScroll) + 'px"';
				b += 'class="sch-print-lockedheader ' + a.lockedGrid.headerCt.el.dom.className + '">';
				b += a.lockedHeader;
				b += "</div>"
			}
			return b
		},
		printNormalHeader: function(a) {
			var b = "";
			if (a.normalGrid) {
				b += '<div style="left:' + (a.lockedGrid ? a.lockedWidth: "0") + "px;width:" + a.normalWidth + 'px;" class="sch-print-normalheader ' + a.normalGrid.headerCt.el.dom.className + '">';
				b += '<div style="margin-left:-' + a.normalScroll + 'px">' + a.normalHeader + "</div>";
				b += "</div>"
			}
			return b
		},
		printLockedGrid: function(a) {
			var b = "";
			if (a.lockedGrid) {
				b += '<div id="lockedRowsCt" style="left:-' + a.lockedScroll + "px;margin-right:-" + a.lockedScroll + "px;width:" + (a.lockedWidth + a.lockedScroll) + "px;top:" + a.headerHeight + 'px;" class="sch-print-locked-rows-ct ' + a.innerLockedClasses + " " + Ext.baseCSSPrefix + 'grid-inner-locked">';
				b += a.lockedRows;
				b += "</div>"
			}
			return b
		},
		printNormalGrid: function(a) {
			var b = "";
			if (a.normalGrid) {
				b += '<div id="normalRowsCt" style="left:' + (a.lockedGrid ? a.lockedWidth: "0") + "px;top:" + a.headerHeight + "px;width:" + a.normalWidth + 'px" class="sch-print-normal-rows-ct ' + a.innerNormalClasses + '">';
				b += '<div style="position:relative;overflow:visible;margin-left:-' + a.normalScroll + 'px">' + a.normalRows + "</div>";
				b += "</div>"
			}
			return b
		}
	}),
	getGridContent: function(n) {
		var m = n.normalGrid,
		e = n.lockedGrid,
		o = e.getView(),
		g = m.getView(),
		j,
		d,
		l,
		i,
		k,
		b,
		h;
		this.beforePrint(n);
		if (e.collapsed && !m.collapsed) {
			b = e.getWidth() + m.getWidth()
		} else {
			b = m.getWidth();
			h = e.getWidth()
		}
		var c = o.store.getRange();
		d = o.tpl.apply(o.collectData(c, 0));
		l = g.tpl.apply(g.collectData(c, 0));
		i = o.el.getScroll().left;
		k = g.el.getScroll().left;
		var a = document.createElement("div");
		a.innerHTML = d;
		if (Ext.versions.extjs.isLessThan("4.2.1")) {
			e.headerCt.items.each(function(q, p) {
				if (q.isHidden()) {
					Ext.fly(a).down("colgroup:nth-child(" + (p + 1) + ") col").setWidth(0)
				}
			})
		}
		d = a.innerHTML;
		if (Sch.feature && Sch.feature.AbstractTimeSpan) {
			var f = (n.plugins || []).concat(n.normalGrid.plugins || []).concat(n.columnLinesFeature || []);
			Ext.each(f,
			function(p) {
				if (p instanceof Sch.feature.AbstractTimeSpan && p.generateMarkup) {
					l = p.generateMarkup(true) + l
				}
			})
		}
		this.afterPrint(n);
		return {
			normalHeader: m.headerCt.el.dom.innerHTML,
			lockedHeader: e.headerCt.el.dom.innerHTML,
			lockedGrid: e.collapsed ? false: e,
			normalGrid: m.collapsed ? false: m,
			lockedRows: d,
			normalRows: l,
			lockedScroll: i,
			normalScroll: k,
			lockedWidth: h - (Ext.isWebKit ? 1: 0),
			normalWidth: b,
			headerHeight: m.headerCt.getHeight(),
			innerLockedClasses: e.view.el.dom.className,
			innerNormalClasses: m.view.el.dom.className + (this.fakeBackgroundColor ? " sch-print-fake-background": ""),
			width: n.getWidth()
		}
	},
	getStylesheets: function() {
		return Ext.getDoc().select('link[rel="stylesheet"]')
	},
	print: function() {
		var g = this.scheduler;
		if (! (this.mainTpl instanceof Ext.Template)) {
			var a = 22;
			this.mainTpl = Ext.create("Ext.XTemplate", this.mainTpl, {
				compiled: true,
				disableFormats: true
			})
		}
		var h = g.getView(),
		i = this.getStylesheets(),
		e = Ext.get(Ext.core.DomHelper.createDom({
			tag: "div"
		})),
		b;
		i.each(function(j) {
			e.appendChild(j.dom.cloneNode(true))
		});
		b = e.dom.innerHTML + "";
		var f = this.getGridContent(g),
		c = this.mainTpl.apply(Ext.apply({
			waitText: this.waitText,
			docType: this.docType,
			htmlClasses: Ext.getBody().parent().dom.className,
			bodyClasses: Ext.getBody().dom.className,
			componentClasses: g.el.dom.className,
			title: (g.title || ""),
			styles: b,
			totalWidth: g.getWidth(),
			setupScript: ("window.onload = function(){ (" + this.setupScript.toString() + ")(" + g.syncRowHeight + ", " + this.autoPrintAndClose + ", " + Ext.isChrome + ", " + Ext.isIE + "); };")
		},
		f));
		var d = window.open("", "printgrid");
		this.printWindow = d;
		d.document.write(c);
		d.document.close()
	},
	setupScript: function(e, a, d, b) {
		var c = function() {
			if (e) {
				var f = document.getElementById("lockedRowsCt"),
				o = document.getElementById("normalRowsCt"),
				g = f && f.getElementsByTagName("tr"),
				m = o && o.getElementsByTagName("tr"),
				k = m && g ? m.length: 0;
				for (var j = 0; j < k; j++) {
					var h = m[j].clientHeight;
					var l = g[j].clientHeight;
					var n = Math.max(h, l) + "px";
					g[j].style.height = m[j].style.height = n
				}
			}
			if (a) {
				window.print();
				if (!d) {
					window.close()
				}
			}
		};
		if (b) {
			setTimeout(c, 0)
		} else {
			c()
		}
	}
});
Ext.define("Sch.plugin.Export", {
	extend: "Ext.util.Observable",
	alternateClassName: "Sch.plugin.PdfExport",
	alias: "plugin.scheduler_export",
	mixins: ["Ext.AbstractPlugin"],
	requires: ["Ext.XTemplate"],
	lockableScope: "top",
	printServer: undefined,
	tpl: null,
	exportDialogClassName: "Sch.widget.ExportDialog",
	exportDialogConfig: {},
	defaultConfig: {
		format: "A4",
		orientation: "portrait",
		range: "complete",
		showHeader: true,
		singlePageExport: false
	},
	expandAllBeforeExport: false,
	pageSizes: {
		A5: {
			width: 5.8,
			height: 8.3
		},
		A4: {
			width: 8.3,
			height: 11.7
		},
		A3: {
			width: 11.7,
			height: 16.5
		},
		Letter: {
			width: 8.5,
			height: 11
		},
		Legal: {
			width: 8.5,
			height: 14
		}
	},
	openAfterExport: true,
	beforeExport: Ext.emptyFn,
	afterExport: Ext.emptyFn,
	fileFormat: "pdf",
	DPI: 72,
	constructor: function(a) {
		a = a || {};
		if (a.exportDialogConfig) {
			Ext.Object.each(this.defaultConfig,
			function(c, b, e) {
				var d = a.exportDialogConfig[c];
				if (d) {
					e[c] = d
				}
			})
		}
		this.callParent([a]);
		if (!this.tpl) {
			this.tpl = new Ext.XTemplate('<!DOCTYPE html><html class="' + Ext.baseCSSPrefix + 'border-box {htmlClasses}"><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type" /><title>{column}/{row}</title>{styles}</head><body class="' + Ext.baseCSSPrefix + 'webkit sch-export {bodyClasses}"><tpl if="showHeader"><div class="sch-export-header" style="width:{totalWidth}px"><h2>{column}/{row}</h2></div></tpl><div class="{componentClasses}" style="height:{bodyHeight}px; width:{totalWidth}px; position: relative !important">{HTML}</div></body></html>', {
				disableFormats: true
			})
		}
		this.addEvents("hidedialogwindow", "showdialogerror", "updateprogressbar");
		this.setFileFormat(this.fileFormat)
	},
	init: function(a) {
		this.scheduler = a;
		a.showExportDialog = Ext.Function.bind(this.showExportDialog, this);
		a.doExport = Ext.Function.bind(this.doExport, this)
	},
	setFileFormat: function(a) {
		if (typeof a !== "string") {
			this.fileFormat = "pdf"
		} else {
			a = a.toLowerCase();
			if (a === "png") {
				this.fileFormat = a
			} else {
				this.fileFormat = "pdf"
			}
		}
	},
	showExportDialog: function() {
		var b = this,
		a = b.scheduler.getSchedulingView();
		if (b.win) {
			b.win.destroy();
			b.win = null
		}
		b.win = Ext.create(b.exportDialogClassName, {
			plugin: b,
			exportDialogConfig: Ext.apply({
				startDate: b.scheduler.getStart(),
				endDate: b.scheduler.getEnd(),
				rowHeight: a.rowHeight,
				columnWidth: a.timeAxisViewModel.getTickWidth(),
				defaultConfig: b.defaultConfig
			},
			b.exportDialogConfig)
		});
		b.saveRestoreData();
		b.win.show()
	},
	saveRestoreData: function() {
		var b = this.scheduler,
		a = b.getSchedulingView(),
		c = b.normalGrid,
		d = b.lockedGrid;
		this.restoreSettings = {
			width: b.getWidth(),
			height: b.getHeight(),
			rowHeight: a.rowHeight,
			columnWidth: a.timeAxisViewModel.getTickWidth(),
			startDate: b.getStart(),
			endDate: b.getEnd(),
			normalWidth: c.getWidth(),
			normalLeft: c.getEl().getStyle("left"),
			lockedWidth: d.getWidth(),
			lockedCollapse: d.collapsed,
			normalCollapse: c.collapsed
		}
	},
	getStylesheets: function() {
		var c = Ext.getDoc().select('link[rel="stylesheet"]'),
		a = Ext.get(Ext.core.DomHelper.createDom({
			tag: "div"
		})),
		b;
		c.each(function(d) {
			a.appendChild(d.dom.cloneNode(true))
		});
		b = a.dom.innerHTML + "";
		return b
	},
	doExport: function(n, j, q) {
		this.mask();
		var K = this,
		p = K.scheduler,
		r = p.getSchedulingView(),
		m = K.getStylesheets(),
		I = n || K.defaultConfig,
		s = p.normalGrid,
		F = p.lockedGrid,
		A = s.headerCt.getHeight();
		K.saveRestoreData();
		s.expand();
		F.expand();
		K.fireEvent("updateprogressbar", 0.1);
		if (this.expandAllBeforeExport && p.expandAll) {
			p.expandAll()
		}
		var J = p.timeAxis.getTicks(),
		t = r.timeAxisViewModel.getTickWidth(),
		D,
		e,
		g;
		if (!I.singlePageExport) {
			if (I.orientation === "landscape") {
				D = K.pageSizes[I.format].height * K.DPI;
				g = K.pageSizes[I.format].width * K.DPI
			} else {
				D = K.pageSizes[I.format].width * K.DPI;
				g = K.pageSizes[I.format].height * K.DPI
			}
			var H = 41;
			e = Math.floor(g) - A - (I.showHeader ? H: 0)
		}
		r.timeAxisViewModel.suppressFit = true;
		var E = 0;
		var k = 0;
		if (I.range !== "complete") {
			var d,
			b;
			switch (I.range) {
			case "date":
				d = new Date(I.dateFrom);
				b = new Date(I.dateTo);
				if (Sch.util.Date.getDurationInDays(d, b) < 1) {
					b = Sch.util.Date.add(b, Sch.util.Date.DAY, 1)
				}
				d = Sch.util.Date.constrain(d, p.getStart(), p.getEnd());
				b = Sch.util.Date.constrain(b, p.getStart(), p.getEnd());
				break;
			case "current":
				var L = r.getVisibleDateRange();
				d = L.startDate;
				b = L.endDate || r.timeAxis.getEnd();
				if (I.cellSize) {
					t = I.cellSize[0];
					if (I.cellSize.length > 1) {
						r.setRowHeight(I.cellSize[1])
					}
				}
				break
			}
			p.setTimeSpan(d, b);
			var c = Math.floor(r.timeAxis.getTickFromDate(d));
			var x = Math.floor(r.timeAxis.getTickFromDate(b));
			J = p.timeAxis.getTicks();
			J = Ext.Array.filter(J,
			function(i, a) {
				if (a < c) {
					E++;
					return false
				} else {
					if (a > x) {
						k++;
						return false
					}
				}
				return true
			})
		}
		this.beforeExport(p, J);
		var C,
		z,
		h;
		if (!I.singlePageExport) {
			p.setWidth(D);
			p.setTimeColumnWidth(t);
			r.timeAxisViewModel.setTickWidth(t);
			h = K.calculatePages(I, J, t, D, e);
			z = K.getExportJsonHtml(h, {
				styles: m,
				config: I,
				ticks: J,
				skippedColsBefore: E,
				skippedColsAfter: k,
				printHeight: e,
				paperWidth: D,
				headerHeight: A
			});
			C = I.format
		} else {
			z = K.getExportJsonHtml(null, {
				styles: m,
				config: I,
				ticks: J,
				skippedColsBefore: E,
				skippedColsAfter: k,
				timeColumnWidth: t
			});
			var f = K.getRealSize(),
			v = Ext.Number.toFixed(f.width / K.DPI, 1),
			u = Ext.Number.toFixed(f.height / K.DPI, 1);
			C = v + "in*" + u + "in"
		}
		K.fireEvent("updateprogressbar", 0.4);
		if (K.printServer) {
			if (!K.debug && !K.test) {
				Ext.Ajax.request({
					type: "POST",
					url: K.printServer,
					timeout: 60000,
					params: {
						html: {
							array: z
						},
						format: C,
						orientation: I.orientation,
						range: I.range,
						fileFormat: K.fileFormat
					},
					success: function(a) {
						K.onSuccess(a, j, q)
					},
					failure: function(a) {
						K.onFailure(a, q)
					},
					scope: K
				})
			} else {
				if (K.debug) {
					var o,
					G = Ext.JSON.decode(z);
					for (var B = 0, y = G.length; B < y; B++) {
						o = window.open();
						o.document.write(G[B].html);
						o.document.close()
					}
				}
			}
		} else {
			throw "Print server URL is not defined, please specify printServer config"
		}
		r.timeAxisViewModel.suppressFit = false;
		K.restorePanel();
		this.afterExport(p);
		if (K.test) {
			return {
				htmlArray: Ext.JSON.decode(z),
				calculatedPages: h
			}
		}
	},
	getRealSize: function() {
		var c = this.scheduler,
		b = c.normalGrid.headerCt.getHeight(),
		a = (b + c.lockedGrid.getView().getEl().down("." + Ext.baseCSSPrefix + "grid-table").getHeight()),
		d = (c.lockedGrid.headerCt.getEl().first().getWidth() + c.normalGrid.body.select("." + Ext.baseCSSPrefix + "grid-table").first().getWidth());
		return {
			width: d,
			height: a
		}
	},
	calculatePages: function(r, s, j, p, b) {
		var t = this,
		i = t.scheduler,
		q = i.lockedGrid,
		c = i.getSchedulingView().rowHeight,
		u = q.headerCt,
		o = u.getEl().first().getWidth(),
		h = null,
		k = 0;
		if (o > q.getWidth()) {
			var g = 0,
			d = 0,
			m = 0,
			n = false,
			e;
			h = [];
			q.headerCt.items.each(function(y, w, v) {
				e = y.width;
				if (!m || m + e < p) {
					m += e;
					if (w === v - 1) {
						n = true;
						var x = p - m;
						k = Math.floor(x / j)
					}
				} else {
					n = true
				}
				if (n) {
					d = w;
					h.push({
						firstColumnIdx: g,
						lastColumnIdx: d,
						totalColumnsWidth: m || e
					});
					g = d + 1;
					m = 0
				}
			})
		} else {
			k = Math.floor((p - o) / j)
		}
		var l = Math.floor(p / j),
		a = Math.ceil((s.length - k) / l),
		f = Math.floor(b / c);
		if (!h || a === 0) {
			a += 1
		}
		return {
			columnsAmountLocked: k,
			columnsAmountNormal: l,
			lockedColumnPages: h,
			rowsAmount: f,
			rowPages: Math.ceil(i.getSchedulingView().store.getCount() / f),
			columnPages: a,
			timeColumnWidth: j,
			lockedGridWidth: o,
			rowHeight: c,
			panelHTML: {}
		}
	},
	getExportJsonHtml: function(f, E) {
		var H = this,
		n = H.scheduler,
		y = [],
		v = new RegExp(Ext.baseCSSPrefix + "ie\\d?|" + Ext.baseCSSPrefix + "gecko", "g"),
		B = Ext.getBody().dom.className.replace(v, ""),
		q = n.el.dom.className,
		m = E.styles,
		F = E.config,
		G = E.ticks,
		o,
		d,
		e,
		p,
		r;
		if (Ext.isIE) {
			B += " sch-ie-export"
		}
		n.timeAxis.autoAdjust = false;
		if (!F.singlePageExport) {
			var s = f.columnsAmountLocked,
			u = f.columnsAmountNormal,
			l = f.lockedColumnPages,
			h = f.rowsAmount,
			t = f.rowPages,
			a = f.columnPages,
			C = E.paperWidth,
			c = E.printHeight,
			z = E.headerHeight,
			j = null,
			b,
			g;
			r = f.timeColumnWidth;
			o = f.panelHTML;
			o.skippedColsBefore = E.skippedColsBefore;
			o.skippedColsAfter = E.skippedColsAfter;
			if (l) {
				g = l.length;
				a += g
			}
			for (var A = 0; A < a; A++) {
				if (l && A < g) {
					if (A === g - 1 && s !== 0) {
						n.normalGrid.show();
						j = Ext.Number.constrain((s - 1), 0, (G.length - 1));
						n.setTimeSpan(G[0].start, G[j].end)
					} else {
						n.normalGrid.hide()
					}
					var D = l[A];
					this.showLockedColumns();
					this.hideLockedColumns(D.firstColumnIdx, D.lastColumnIdx);
					n.lockedGrid.setWidth(D.totalColumnsWidth + 1)
				} else {
					if (A === 0) {
						this.showLockedColumns();
						if (s !== 0) {
							n.normalGrid.show()
						}
						j = Ext.Number.constrain(s - 1, 0, G.length - 1);
						n.setTimeSpan(G[0].start, G[j].end)
					} else {
						n.lockedGrid.hide();
						n.normalGrid.show();
						if (j === null) {
							j = -1
						}
						if (G[j + u]) {
							n.setTimeSpan(G[j + 1].start, G[j + u].end);
							j = j + u
						} else {
							n.setTimeSpan(G[j + 1].start, G[G.length - 1].end)
						}
					}
				}
				n.setTimeColumnWidth(r, true);
				n.getSchedulingView().timeAxisViewModel.setTickWidth(r);
				for (var x = 0; x < t; x += 1) {
					H.hideRows(h, x);
					o.dom = n.body.dom.innerHTML;
					o.k = x;
					o.i = A;
					d = H.resizePanelHTML(o);
					p = H.tpl.apply(Ext.apply({
						bodyClasses: B,
						bodyHeight: c + z,
						componentClasses: q,
						styles: m,
						showHeader: F.showHeader,
						HTML: d.dom.innerHTML,
						totalWidth: C,
						headerHeight: z,
						column: A + 1,
						row: x + 1
					}));
					e = {
						html: p
					};
					y.push(e);
					H.showRows()
				}
			}
		} else {
			r = E.timeColumnWidth;
			o = f ? f.panelHTML: {};
			n.setTimeSpan(G[0].start, G[G.length - 1].end);
			n.lockedGrid.setWidth(n.lockedGrid.headerCt.getEl().first().getWidth());
			n.setTimeColumnWidth(r);
			n.getSchedulingView().timeAxisViewModel.setTickWidth(r);
			var w = H.getRealSize();
			Ext.apply(o, {
				dom: n.body.dom.innerHTML,
				column: 1,
				row: 1,
				timeColumnWidth: E.timeColumnWidth,
				skippedColsBefore: E.skippedColsBefore,
				skippedColsAfter: E.skippedColsAfter
			});
			d = H.resizePanelHTML(o);
			p = H.tpl.apply(Ext.apply({
				bodyClasses: B,
				bodyHeight: w.height,
				componentClasses: q,
				styles: m,
				showHeader: false,
				HTML: d.dom.innerHTML,
				totalWidth: w.width
			}));
			e = {
				html: p
			};
			y.push(e)
		}
		n.timeAxis.autoAdjust = true;
		return Ext.JSON.encode(y)
	},
	resizePanelHTML: function(f) {
		var k = Ext.get(Ext.core.DomHelper.createDom({
			tag: "div",
			html: f.dom
		})),
		j = this.scheduler,
		d = j.lockedGrid,
		i = j.normalGrid,
		g,
		e,
		b;
		if (Ext.isIE6 || Ext.isIE7 || Ext.isIEQuirks) {
			var h = document.createDocumentFragment(),
			a,
			c;
			if (h.getElementById) {
				a = "getElementById";
				c = ""
			} else {
				a = "querySelector";
				c = "#"
			}
			h.appendChild(k.dom);
			g = d.view.el;
			e = [h[a](c + j.id + "-targetEl"), h[a](c + j.id + "-innerCt"), h[a](c + d.id), h[a](c + d.body.id), h[a](c + g.id)];
			b = [h[a](c + i.id), h[a](c + i.headerCt.id), h[a](c + i.body.id), h[a](c + i.getView().id)];
			Ext.Array.each(e,
			function(l) {
				if (l !== null) {
					l.style.height = "100%";
					l.style.width = "100%"
				}
			});
			Ext.Array.each(b,
			function(m, l) {
				if (m !== null) {
					if (l === 1) {
						m.style.width = "100%"
					} else {
						m.style.height = "100%";
						m.style.width = "100%"
					}
				}
			});
			k.dom.innerHTML = h.firstChild.innerHTML
		} else {
			g = d.view.el;
			e = [k.select("#" + j.id + "-targetEl").first(), k.select("#" + j.id + "-innerCt").first(), k.select("#" + d.id).first(), k.select("#" + d.body.id).first(), k.select("#" + g.id)];
			b = [k.select("#" + i.id).first(), k.select("#" + i.headerCt.id).first(), k.select("#" + i.body.id).first(), k.select("#" + i.getView().id).first()];
			Ext.Array.each(e,
			function(m, l) {
				if (m) {
					m.setHeight("100%");
					if (l !== 3 && l !== 2) {
						m.setWidth("100%")
					}
				}
			});
			Ext.Array.each(b,
			function(m, l) {
				if (l === 1) {
					m.setWidth("100%")
				} else {
					m.applyStyles({
						height: "100%",
						width: "100%"
					})
				}
			})
		}
		return k
	},
	getWin: function() {
		return this.win || null
	},
	onSuccess: function(c, h, b) {
		var d = this,
		g = d.getWin(),
		a;
		try {
			a = Ext.JSON.decode(c.responseText)
		} catch(f) {
			this.onFailure(c, b);
			return
		}
		d.fireEvent("updateprogressbar", 1);
		if (a.success) {
			setTimeout(function() {
				d.fireEvent("hidedialogwindow");
				d.unmask();
				if (d.openAfterExport) {
					window.open(a.url, "ExportedPanel")
				}
			},
			g ? g.hideTime: 3000)
		} else {
			d.fireEvent("showdialogerror", g, a.msg);
			d.unmask()
		}
		if (h) {
			h.call(this, c)
		}
	},
	onFailure: function(b, a) {
		var c = this.getWin(),
		d = b.status === 200 ? b.responseText: b.statusText;
		this.fireEvent("showdialogerror", c, d);
		this.unmask();
		if (a) {
			a.call(this, b)
		}
	},
	hideRows: function(e, g) {
		var d = this.scheduler.lockedGrid.view.getNodes(),
		a = this.scheduler.normalGrid.view.getNodes(),
		h = e * g,
		c = h + e;
		for (var f = 0, b = a.length; f < b; f++) {
			if (f < h || f >= c) {
				d[f].className += " sch-none";
				a[f].className += " sch-none"
			}
		}
	},
	showRows: function() {
		this.scheduler.getEl().select(this.scheduler.getSchedulingView().getItemSelector()).each(function(a) {
			a.removeCls("sch-none")
		})
	},
	hideLockedColumns: function(c, e) {
		var d = this.scheduler.lockedGrid.headerCt.items.items;
		for (var b = 0, a = d.length; b < a; b++) {
			if (b < c || b > e) {
				d[b].hide()
			}
		}
	},
	showLockedColumns: function() {
		this.scheduler.lockedGrid.headerCt.items.each(function(a) {
			a.show()
		})
	},
	mask: function() {
		var a = Ext.getBody().mask();
		a.addCls("sch-export-mask")
	},
	unmask: function() {
		Ext.getBody().unmask()
	},
	restorePanel: function() {
		var b = this.scheduler,
		a = this.restoreSettings;
		b.setWidth(a.width);
		b.setHeight(a.height);
		b.setTimeSpan(a.startDate, a.endDate);
		b.setTimeColumnWidth(a.columnWidth, true);
		b.getSchedulingView().setRowHeight(a.rowHeight);
		b.lockedGrid.show();
		b.normalGrid.setWidth(a.normalWidth);
		b.normalGrid.getEl().setStyle("left", a.normalLeft);
		b.lockedGrid.setWidth(a.lockedWidth);
		if (a.lockedCollapse) {
			b.lockedGrid.collapse()
		}
		if (a.normalCollapse) {
			b.normalGrid.collapse()
		}
	},
	destroy: function() {
		if (this.win) {
			this.win.destroy()
		}
	}
});
Ext.define("Sch.plugin.Lines", {
	extend: "Sch.feature.AbstractTimeSpan",
	alias: "plugin.scheduler_lines",
	cls: "sch-timeline",
	showTip: true,
	innerTpl: null,
	prepareTemplateData: null,
	side: null,
	init: function(a) {
		this.callParent(arguments);
		if (Ext.isString(this.innerTpl)) {
			this.innerTpl = new Ext.XTemplate(this.innerTpl)
		}
		this.side = a.rtl ? "right": "left";
		var b = this.innerTpl;
		if (!this.template) {
			this.template = new Ext.XTemplate('<tpl for=".">', '<div id="' + this.uniqueCls + '-{id}"' + (this.showTip ? 'title="{[this.getTipText(values)]}" ': "") + 'class="' + this.cls + " " + this.uniqueCls + ' {Cls}" style="' + this.side + ':{left}px;top:{top}px;height:{height}px;width:{width}px">' + (b ? "{[this.renderInner(values)]}": "") + "</div>", "</tpl>", {
				getTipText: function(c) {
					return a.getSchedulingView().getFormattedDate(c.Date) + " " + (c.Text || "")
				},
				renderInner: function(c) {
					return b.apply(c)
				}
			})
		}
	},
	getElementData: function(k, n, d) {
		var o = this.store,
		j = this.schedulerView,
		f = d || o.getRange(),
		b = j.getOrientation(),
		h = [],
		a,
		c,
		m;
		for (var g = 0, e = f.length; g < e; g++) {
			a = f[g];
			c = a.get("Date");
			if (c && Sch.util.Date.betweenLesser(c, k, n)) {
				m = j.getTimeSpanRegion(c, null, this.expandToFitView);
				if (b === "horizontal") {
					h[h.length] = Ext.apply({
						id: a.internalId,
						left: m.left,
						top: m.top,
						width: 1,
						height: Ext.versions.touch ? "100%": m.bottom - m.top
					},
					this.prepareTemplateData ? this.prepareTemplateData(a) : a.data)
				} else {
					h[h.length] = Ext.apply({
						id: a.internalId,
						left: m.left,
						top: m.top,
						width: m.right - m.left,
						height: 1
					},
					this.prepareTemplateData ? this.prepareTemplateData(a) : a.data)
				}
			}
		}
		return h
	}
});
Ext.define("Sch.plugin.CurrentTimeLine", {
	extend: "Sch.plugin.Lines",
	alias: "plugin.scheduler_currenttimeline",
	mixins: ["Sch.mixin.Localizable"],
	updateInterval: 60000,
	autoUpdate: true,
	expandToFitView: true,
	timer: null,
	init: function(c) {
		var b = Ext.create("Ext.data.JsonStore", {
			fields: ["Date", "Cls", "Text"],
			data: [{
				Date: new Date(),
				Cls: "sch-todayLine",
				Text: this.L("tooltipText")
			}]
		});
		var a = b.first();
		if (this.autoUpdate) {
			this.timer = setInterval(function() {
				a.set("Date", new Date())
			},
			this.updateInterval)
		}
		c.on("destroy", this.onHostDestroy, this);
		this.store = b;
		this.callParent(arguments)
	},
	onHostDestroy: function() {
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = null
		}
		if (this.store.autoDestroy) {
			this.store.destroy()
		}
	}
});
Ext.define("Sch.plugin.DragSelector", {
	extend: "Sch.util.DragTracker",
	alias: "plugin.scheduler_dragselector",
	mixins: ["Ext.AbstractPlugin"],
	lockableScope: "top",
	constructor: function(a) {
		a = a || {};
		Ext.applyIf(a, {
			onBeforeStart: this.onBeforeStart,
			onStart: this.onStart,
			onDrag: this.onDrag,
			onEnd: this.onEnd
		});
		this.callParent(arguments)
	},
	init: function(a) {
		a.on({
			afterrender: this.onSchedulerRender,
			destroy: this.onSchedulerDestroy,
			scope: this
		});
		this.scheduler = a
	},
	onBeforeStart: function(a) {
		return a.ctrlKey
	},
	onStart: function(b) {
		var c = this.schedulerView;
		if (!this.proxy) {
			this.proxy = c.el.createChild({
				cls: "sch-drag-selector"
			})
		} else {
			this.proxy.show()
		}
		this.bodyRegion = c.getScheduleRegion();
		var a = [];
		c.getEventNodes().each(function(d) {
			a[a.length] = {
				region: d.getRegion(),
				node: d.dom
			}
		},
		this);
		this.eventData = a;
		this.sm.deselectAll()
	},
	onDrag: function(h) {
		var j = this.sm,
		f = this.eventData,
		b = this.getRegion().constrainTo(this.bodyRegion),
		c,
		d,
		a,
		g;
		this.proxy.setRegion(b);
		for (c = 0, a = f.length; c < a; c++) {
			d = f[c];
			g = b.intersect(d.region);
			if (g && !d.selected) {
				d.selected = true;
				j.selectNode(d.node, true)
			} else {
				if (!g && d.selected) {
					d.selected = false;
					j.deselectNode(d.node)
				}
			}
		}
	},
	onEnd: function(a) {
		if (this.proxy) {
			this.proxy.setDisplayed(false)
		}
	},
	onSchedulerRender: function(a) {
		this.sm = a.getEventSelectionModel();
		this.schedulerView = a.getSchedulingView();
		this.initEl(a.el)
	},
	onSchedulerDestroy: function() {
		Ext.destroy(this.proxy);
		this.destroy()
	}
});
Ext.define("Sch.plugin.EventEditor", {
	extend: "Ext.form.Panel",
	mixins: ["Ext.AbstractPlugin", "Sch.mixin.Localizable"],
	alias: ["widget.eventeditor", "plugin.scheduler_eventeditor"],
	lockableScope: "normal",
	requires: ["Sch.util.Date"],
	hideOnBlur: true,
	startDateField: null,
	startTimeField: null,
	durationField: null,
	timeConfig: null,
	dateConfig: null,
	durationConfig: null,
	durationUnit: null,
	durationText: null,
	triggerEvent: "eventdblclick",
	fieldsPanelConfig: null,
	dateFormat: "Y-m-d",
	timeFormat: "H:i",
	cls: "sch-eventeditor",
	border: false,
	shadow: false,
	dynamicForm: true,
	eventRecord: null,
	hidden: true,
	collapsed: true,
	currentForm: null,
	scheduler: null,
	schedulerView: null,
	resourceRecord: null,
	preventHeader: true,
	floating: true,
	hideMode: "offsets",
	ignoreCls: "sch-event-editor-ignore-click",
	layout: {
		type: "vbox",
		align: "stretch"
	},
	constrain: false,
	constructor: function(a) {
		a = a || {};
		Ext.apply(this, a);
		this.durationUnit = this.durationUnit || Sch.util.Date.HOUR;
		this.addEvents("beforeeventdelete", "beforeeventsave");
		this.callParent(arguments)
	},
	initComponent: function() {
		if (!this.fieldsPanelConfig) {
			throw "Must define a fieldsPanelConfig property"
		}
		Ext.apply(this, {
			fbar: this.buttons || this.buildButtons(),
			items: [{
				xtype: "container",
				layout: "hbox",
				height: 35,
				border: false,
				cls: "sch-eventeditor-timefields",
				items: this.buildDurationFields()
			},
			Ext.applyIf(this.fieldsPanelConfig, {
				flex: 1,
				activeItem: 0
			})]
		});
		this.callParent(arguments)
	},
	init: function(a) {
		this.ownerCt = a;
		this.schedulerView = a.getView();
		this.eventStore = this.schedulerView.getEventStore();
		this.schedulerView.on({
			afterrender: this.onSchedulerRender,
			destroy: this.onSchedulerDestroy,
			dragcreateend: this.onDragCreateEnd,
			scope: this
		});
		if (this.triggerEvent) {
			this.schedulerView.on(this.triggerEvent, this.onActivateEditor, this)
		}
		this.schedulerView.registerEventEditor(this)
	},
	onSchedulerRender: function() {
		this.render(Ext.getBody());
		if (this.hideOnBlur) {
			this.mon(Ext.getDoc(), "mousedown", this.onMouseDown, this)
		}
	},
	show: function(b, f) {
		if (this.deleteButton) {
			this.deleteButton.setVisible(this.eventStore.indexOf(b) >= 0)
		}
		this.eventRecord = b;
		this.durationField.setValue(Sch.util.Date.getDurationInUnit(b.getStartDate(), b.getEndDate(), this.durationUnit));
		var a = b.getStartDate();
		this.startDateField.setValue(a);
		this.startTimeField.setValue(a);
		var d = this.schedulerView.up("[floating=true]");
		if (d) {
			this.getEl().setZIndex(d.getEl().getZIndex() + 1);
			d.addCls(this.ignoreCls)
		}
		this.callParent();
		f = f || this.schedulerView.getElementFromEventRecord(b);
		this.alignTo(f, this.schedulerView.getOrientation() == "horizontal" ? "bl": "tl-tr", this.getConstrainOffsets(f));
		this.expand(!this.constrain);
		if (this.constrain) {
			this.doConstrain(Ext.util.Region.getRegion(Ext.getBody()))
		}
		var g,
		e = b.get("EventType");
		if (e && this.dynamicForm) {
			var h = this.items.getAt(1),
			c = h.query("> component[EventType=" + e + "]");
			if (!c.length) {
				throw "Can't find form for EventType=" + e
			}
			if (!h.getLayout().setActiveItem) {
				throw "Can't switch active component in the 'fieldsPanel'"
			}
			g = c[0];
			if (! (g instanceof Ext.form.Panel)) {
				throw "Each child component of 'fieldsPanel' should be a 'form'"
			}
			h.getLayout().setActiveItem(g)
		} else {
			g = this
		}
		this.currentForm = g;
		g.getForm().loadRecord(b)
	},
	getConstrainOffsets: function(a) {
		return [0, 0]
	},
	onSaveClick: function() {
		var e = this,
		h = e.eventRecord,
		a = this.currentForm.getForm();
		if (a.isValid() && this.fireEvent("beforeeventsave", this, h) !== false) {
			var c = e.startDateField.getValue(),
			i,
			b = e.startTimeField.getValue(),
			g = e.durationField.getValue();
			if (c && g >= 0) {
				if (b) {
					Sch.util.Date.copyTimeValues(c, b)
				}
				i = Sch.util.Date.add(c, this.durationUnit, g)
			} else {
				return
			}
			var d = h.getResources();
			var f = (d.length > 0 && d[0]) || this.resourceRecord;
			if (!this.schedulerView.allowOverlap && !this.schedulerView.isDateRangeAvailable(c, i, h, f)) {
				return
			}
			h.beginEdit();
			var j = h.endEdit;
			h.endEdit = Ext.emptyFn;
			a.updateRecord(h);
			h.endEdit = j;
			h.setStartEndDate(c, i);
			h.endEdit();
			if (this.eventStore.indexOf(this.eventRecord) < 0) {
				if (this.schedulerView.fireEvent("beforeeventadd", this.schedulerView, h) !== false) {
					this.eventStore.append(h)
				}
			}
			e.collapse(null, true)
		}
	},
	onDeleteClick: function() {
		if (this.fireEvent("beforeeventdelete", this, this.eventRecord) !== false) {
			this.eventStore.remove(this.eventRecord)
		}
		this.collapse(null, true)
	},
	onCancelClick: function() {
		this.collapse(null, true)
	},
	buildButtons: function() {
		this.saveButton = new Ext.Button({
			text: this.L("saveText"),
			scope: this,
			handler: this.onSaveClick
		});
		this.deleteButton = new Ext.Button({
			text: this.L("deleteText"),
			scope: this,
			handler: this.onDeleteClick
		});
		this.cancelButton = new Ext.Button({
			text: this.L("cancelText"),
			scope: this,
			handler: this.onCancelClick
		});
		return [this.saveButton, this.deleteButton, this.cancelButton]
	},
	buildDurationFields: function() {
		this.startDateField = new Ext.form.field.Date(Ext.apply({
			width: 90,
			allowBlank: false,
			format: this.dateFormat
		},
		this.dateConfig || {}));
		this.startDateField.getPicker().addCls(this.ignoreCls);
		this.startTimeField = new Ext.form.field.Time(Ext.apply({
			width: 70,
			allowBlank: false,
			format: this.timeFormat
		},
		this.timeConfig || {}));
		this.startTimeField.getPicker().addCls(this.ignoreCls);
		this.durationField = new Ext.form.field.Number(Ext.apply({
			width: 45,
			value: 0,
			minValue: 0,
			allowNegative: false
		},
		this.durationConfig || {}));
		this.durationLabel = Ext.create("Ext.form.Label", {
			text: this.getDurationText()
		});
		return [this.startDateField, this.startTimeField, this.durationField, this.durationLabel]
	},
	onActivateEditor: function(b, a) {
		this.show(a)
	},
	onMouseDown: function(a) {
		if (this.collapsed || a.within(this.getEl()) || a.getTarget("." + this.ignoreCls, 9) || a.getTarget(this.schedulerView.eventSelector)) {
			return
		}
		this.collapse()
	},
	onSchedulerDestroy: function() {
		this.destroy()
	},
	onDragCreateEnd: function(b, a, c) {
		if (!this.dragProxyEl && this.schedulerView.dragCreator) {
			this.dragProxyEl = this.schedulerView.dragCreator.getProxy()
		}
		this.resourceRecord = c;
		this.schedulerView.onEventCreated(a);
		this.show(a, this.dragProxyEl)
	},
	hide: function() {
		this.callParent(arguments);
		var a = this.dragProxyEl;
		if (a) {
			a.hide()
		}
	},
	afterCollapse: function() {
		this.hide();
		this.callParent(arguments)
	},
	getDurationText: function() {
		if (this.durationText) {
			return this.durationText
		}
		return Sch.util.Date.getShortNameOfUnit(Sch.util.Date.getNameOfUnit(this.durationUnit))
	}
});
Ext.define("Sch.plugin.EventTools", {
	extend: "Ext.Container",
	mixins: ["Ext.AbstractPlugin"],
	lockableScope: "top",
	alias: "plugin.scheduler_eventtools",
	hideDelay: 500,
	align: "right",
	defaults: {
		xtype: "tool",
		baseCls: "sch-tool",
		overCls: "sch-tool-over",
		width: 20,
		height: 20,
		visibleFn: Ext.emptyFn
	},
	hideTimer: null,
	lastPosition: null,
	cachedSize: null,
	offset: {
		x: 0,
		y: 1
	},
	autoRender: true,
	floating: true,
	hideMode: "offsets",
	hidden: true,
	getRecord: function() {
		return this.record
	},
	init: function(a) {
		if (!this.items) {
			throw "Must define an items property for this plugin to function correctly"
		}
		this.addCls("sch-event-tools");
		this.scheduler = a;
		a.on({
			eventresizestart: this.onOperationStart,
			eventresizeend: this.onOperationEnd,
			eventdragstart: this.onOperationStart,
			eventdrop: this.onOperationEnd,
			eventmouseenter: this.onEventMouseEnter,
			eventmouseleave: this.onContainerMouseLeave,
			scope: this
		})
	},
	onRender: function() {
		this.callParent(arguments);
		this.scheduler.mon(this.el, {
			mouseenter: this.onContainerMouseEnter,
			mouseleave: this.onContainerMouseLeave,
			scope: this
		})
	},
	onEventMouseEnter: function(f, a, e) {
		if (!this.rendered) {
			this.doAutoRender()
		}
		var d = e.getTarget(f.eventSelector);
		var c = Ext.fly(d).getBox();
		this.record = a;
		this.items.each(function(g) {
			g.setVisible(g.visibleFn(a) !== false)
		},
		this);
		this.doLayout();
		var b = this.getSize();
		this.lastPosition = [e.getXY()[0] - (b.width / 2), c.y - b.height - this.offset.y];
		this.onContainerMouseEnter()
	},
	onContainerMouseEnter: function() {
		window.clearTimeout(this.hideTimer);
		this.setPosition.apply(this, this.lastPosition);
		this.show()
	},
	onContainerMouseLeave: function() {
		window.clearTimeout(this.hideTimer);
		this.hideTimer = Ext.defer(this.hide, this.hideDelay, this)
	},
	onOperationStart: function() {
		this.scheduler.un("eventmouseenter", this.onEventMouseEnter, this);
		window.clearTimeout(this.hideTimer);
		this.hide()
	},
	onOperationEnd: function() {
		this.scheduler.on("eventmouseenter", this.onEventMouseEnter, this)
	}
});
Ext.define("Sch.plugin.Pan", {
	extend: "Ext.AbstractPlugin",
	alias: "plugin.scheduler_pan",
	lockableScope: "top",
	enableVerticalPan: true,
	panel: null,
	constructor: function(a) {
		Ext.apply(this, a)
	},
	init: function(a) {
		this.panel = a.normalGrid || a;
		this.view = a.getSchedulingView();
		this.view.on("afterrender", this.onRender, this)
	},
	onRender: function(a) {
		this.view.el.on("mousedown", this.onMouseDown, this)
	},
	onMouseDown: function(b, a) {
		if (b.getTarget("." + this.view.timeCellCls, 10) && !b.getTarget(this.view.eventSelector)) {
			this.mouseX = b.getPageX();
			this.mouseY = b.getPageY();
			Ext.getBody().on("mousemove", this.onMouseMove, this);
			Ext.getDoc().on("mouseup", this.onMouseUp, this);
			if (Ext.isIE || Ext.isGecko) {
				Ext.getBody().on("mouseenter", this.onMouseUp, this)
			}
			b.stopEvent()
		}
	},
	onMouseMove: function(d) {
		d.stopEvent();
		var a = d.getPageX(),
		f = d.getPageY(),
		c = a - this.mouseX,
		b = f - this.mouseY;
		this.panel.scrollByDeltaX( - c);
		this.mouseX = a;
		this.mouseY = f;
		if (this.enableVerticalPan) {
			this.panel.scrollByDeltaY( - b)
		}
	},
	onMouseUp: function(a) {
		Ext.getBody().un("mousemove", this.onMouseMove, this);
		Ext.getDoc().un("mouseup", this.onMouseUp, this);
		if (Ext.isIE || Ext.isGecko) {
			Ext.getBody().un("mouseenter", this.onMouseUp, this)
		}
	}
});
Ext.define("Sch.plugin.SimpleEditor", {
	extend: "Ext.Editor",
	alias: "plugin.scheduler_simpleeditor",
	mixins: ["Ext.AbstractPlugin", "Sch.mixin.Localizable"],
	lockableScope: "top",
	cls: "sch-simpleeditor",
	allowBlur: false,
	delegate: ".sch-event-inner",
	dataIndex: null,
	completeOnEnter: true,
	cancelOnEsc: true,
	ignoreNoChange: true,
	height: 19,
	autoSize: {
		width: "boundEl"
	},
	constructor: function(a) {
		a = a || {};
		a.field = a.field || Ext.create("Ext.form.TextField", {
			selectOnFocus: true
		});
		this.callParent(arguments)
	},
	init: function(a) {
		this.scheduler = a.getSchedulingView();
		a.on("afterrender", this.onSchedulerRender, this);
		this.scheduler.registerEventEditor(this);
		this.dataIndex = this.dataIndex || this.scheduler.getEventStore().model.prototype.nameField
	},
	edit: function(a, b) {
		b = b || this.scheduler.getElementFromEventRecord(a);
		this.startEdit(b.child(this.delegate));
		this.record = a;
		this.setValue(this.record.get(this.dataIndex))
	},
	onSchedulerRender: function(a) {
		this.on({
			startedit: this.onBeforeEdit,
			complete: function(e, f, d) {
				var b = this.record;
				var c = this.scheduler.eventStore;
				b.set(this.dataIndex, f);
				if (c.indexOf(b) < 0) {
					if (this.scheduler.fireEvent("beforeeventadd", this.scheduler, b) !== false) {
						c.append(b)
					}
				}
				this.onAfterEdit()
			},
			canceledit: this.onAfterEdit,
			hide: function() {
				if (this.dragProxyEl) {
					this.dragProxyEl.hide()
				}
			},
			scope: this
		});
		a.on({
			eventdblclick: function(b, c, d) {
				this.edit(c)
			},
			dragcreateend: this.onDragCreateEnd,
			scope: this
		})
	},
	onBeforeEdit: function() {
		if (!this.allowBlur) {
			Ext.getBody().on("mousedown", this.onMouseDown, this);
			this.scheduler.on("eventmousedown",
			function() {
				this.cancelEdit()
			},
			this)
		}
	},
	onAfterEdit: function() {
		if (!this.allowBlur) {
			Ext.getBody().un("mousedown", this.onMouseDown, this);
			this.scheduler.un("eventmousedown",
			function() {
				this.cancelEdit()
			},
			this)
		}
	},
	onMouseDown: function(b, a) {
		if (this.editing && this.el && !b.within(this.el)) {
			this.cancelEdit()
		}
	},
	onDragCreateEnd: function(b, a) {
		if (!this.dragProxyEl && this.scheduler.dragCreator) {
			this.dragProxyEl = this.scheduler.dragCreator.getProxy()
		}
		this.scheduler.onEventCreated(a);
		if (a.get(this.dataIndex) === "") {
			a.set(this.dataIndex, this.L("newEventText"))
		}
		this.edit(a, this.dragProxyEl)
	}
});
Ext.define("Sch.plugin.SummaryColumn", {
	extend: "Ext.grid.column.Column",
	alias: ["widget.summarycolumn", "plugin.scheduler_summarycolumn"],
	mixins: ["Ext.AbstractPlugin"],
	lockableScope: "top",
	showPercent: false,
	nbrDecimals: 1,
	sortable: false,
	fixed: true,
	menuDisabled: true,
	width: 80,
	dataIndex: "_sch_not_used",
	constructor: function(a) {
		this.scope = this;
		this.callParent(arguments)
	},
	init: function(a) {
		if (! ("eventStore" in a)) {
			return
		}
		this.scheduler = a;
		this.scheduler.lockedGridDependsOnSchedule = true;
		this.eventStore = a.eventStore
	},
	renderer: function(j, a, f) {
		var h = this.scheduler,
		k = this.eventStore,
		e = h.getStart(),
		i = h.getEnd(),
		c = 0,
		b = this.calculate(k.getEventsForResource(f), e, i);
		if (b <= 0) {
			return ""
		}
		if (this.showPercent) {
			var d = Sch.util.Date.getDurationInMinutes(e, i);
			return (Math.round((b * 100) / d)) + " %"
		} else {
			if (b > 1440) {
				return (b / 1440).toFixed(this.nbrDecimals) + " " + Sch.util.Date.getShortNameOfUnit("DAY")
			}
			if (b >= 30) {
				return (b / 60).toFixed(this.nbrDecimals) + " " + Sch.util.Date.getShortNameOfUnit("HOUR")
			}
			return b + " " + Sch.util.Date.getShortNameOfUnit("MINUTE")
		}
	},
	calculate: function(c, g, d) {
		var e = 0,
		b,
		a,
		f = Sch.util.Date;
		Ext.each(c,
		function(h) {
			b = h.getStartDate();
			a = h.getEndDate();
			if (f.intersectSpans(g, d, b, a)) {
				e += f.getDurationInMinutes(f.max(b, g), f.min(a, d))
			}
		});
		return e
	}
});
Ext.define("Sch.plugin.Zones", {
	extend: "Sch.feature.AbstractTimeSpan",
	alias: "plugin.scheduler_zones",
	innerTpl: null,
	requires: ["Sch.model.Range"],
	cls: "sch-zone",
	side: null,
	init: function(a) {
		if (Ext.isString(this.innerTpl)) {
			this.innerTpl = new Ext.XTemplate(this.innerTpl)
		}
		this.side = a.rtl ? "right": "left";
		var b = this.innerTpl;
		if (!this.template) {
			this.template = new Ext.XTemplate('<tpl for="."><div id="' + this.uniqueCls + '-{id}" class="' + this.cls + " " + this.uniqueCls + ' {Cls}" style="' + this.side + ':{left}px;top:{top}px;height:{height}px;width:{width}px;{style}">' + (b ? "{[this.renderInner(values)]}": "") + "</div></tpl>", {
				renderInner: function(c) {
					return b.apply(c)
				}
			})
		}
		this.callParent(arguments)
	},
	getElementData: function(j, o, d, p) {
		var m = this.schedulerView,
		f = [];
		d = d || this.store.getRange();
		for (var g = 0, e = d.length; g < e; g++) {
			var h = d[g];
			var n = h.getStartDate();
			var c = h.getEndDate();
			if (n && c && Sch.util.Date.intersectSpans(n, c, j, o)) {
				var k = m.getTimeSpanRegion(Sch.util.Date.max(n, j), Sch.util.Date.min(c, o), this.expandToFitView);
				var b = k.right - k.left + 1;
				var a = Ext.apply({
					id: h.internalId,
					left: k.left,
					top: k.top,
					width: p ? 0: b,
					height: Ext.versions.touch ? "100%": k.bottom - k.top,
					style: p ? ("border-left-width:" + b + "px") : "",
					Cls: h.getCls()
				},
				h.data);
				f[f.length] = a
			}
		}
		return f
	}
});
Ext.define("Sch.plugin.TimeGap", {
	extend: "Sch.plugin.Zones",
	alias: "plugin.scheduler_timegap",
	getZoneCls: Ext.emptyFn,
	init: function(a) {
		this.store = new Ext.data.JsonStore({
			model: "Sch.model.Range"
		});
		this.scheduler = a;
		a.mon(a.eventStore, {
			load: this.populateStore,
			update: this.populateStore,
			remove: this.populateStore,
			add: this.populateStore,
			datachanged: this.populateStore,
			scope: this
		});
		a.on("viewchange", this.populateStore, this);
		this.schedulerView = a.getSchedulingView();
		this.callParent(arguments)
	},
	populateStore: function(c) {
		var b = this.schedulerView.getEventsInView(),
		f = [],
		e = this.scheduler.getStart(),
		i = this.scheduler.getEnd(),
		d = b.getCount(),
		j = e,
		h,
		g = 0,
		a;
		b.sortBy(function(l, k) {
			return l.getStartDate() - k.getStartDate()
		});
		a = b.getAt(0);
		while (j < i && g < d) {
			h = a.getStartDate();
			if (!Sch.util.Date.betweenLesser(j, h, a.getEndDate()) && j < h) {
				f.push(new this.store.model({
					StartDate: j,
					EndDate: h,
					Cls: this.getZoneCls(j, h) || ""
				}))
			}
			j = Sch.util.Date.max(a.getEndDate(), j);
			g++;
			a = b.getAt(g)
		}
		if (j < i) {
			f.push(new this.store.model({
				StartDate: j,
				EndDate: i,
				Cls: this.getZoneCls(j, i) || ""
			}))
		}
		this.store.removeAll(f.length > 0);
		this.store.add(f)
	}
});
Ext.define("Sch.plugin.TreeCellEditing", {
	extend: "Ext.grid.plugin.CellEditing",
	alias: "plugin.scheduler_treecellediting",
	lockableScope: "locked",
	init: function(a) {
		this._grid = a;
		this.on("beforeedit", this.checkReadOnly, this);
		this.on("beforeedit", this.onBeforeCellEdit, this);
		this.callParent(arguments)
	},
	bindPositionFixer: function() {
		Ext.on({
			afterlayout: this.fixEditorPosition,
			scope: this
		})
	},
	unbindPositionFixer: function() {
		Ext.un({
			afterlayout: this.fixEditorPosition,
			scope: this
		})
	},
	fixEditorPosition: function(a) {
		var b = this.getActiveEditor();
		if (b) {
			var d = this.getEditingContext(this.context.record, this.context.column);
			if (d) {
				this.context.row = d.row;
				this.context.rowIdx = d.rowIdx;
				b.boundEl = this.getCell(d.record, d.column);
				b.realign();
				var c = this._grid.getView();
				c.focusedRow = c.getNode(d.rowIdx)
			}
		}
	},
	checkReadOnly: function() {
		var a = this._grid;
		if (! (a instanceof Sch.panel.TimelineTreePanel)) {
			a = a.up("tablepanel")
		}
		return ! a.isReadOnly()
	},
	startEdit: function(a, d, b) {
		this._grid.suspendLayouts();
		var c = d.getEditor && d.getEditor(),
		e;
		if (c && c.setSuppressTaskUpdate) {
			e = c.getSuppressTaskUpdate();
			c.setSuppressTaskUpdate(true)
		}
		this.completeEdit();
		var f = this.callParent(arguments);
		if (c && c.setSuppressTaskUpdate) {
			c.setSuppressTaskUpdate(e)
		}
		this._grid.resumeLayouts();
		return f
	},
	onBeforeCellEdit: function(c, a) {
		var b = a.column;
		var d = b.field;
		if (d) {
			if (d.setTask) {
				d.setTask(a.record);
				a.value = a.originalValue = d.getValue()
			} else {
				if (!b.dataIndex && a.value === undefined) {
					a.value = d.getDisplayValue(a.record)
				}
			}
		}
	},
	onEditComplete: function(c, f, b) {
		var e = this,
		a,
		d;
		if (c.field.applyChanges) {
			a = c.field.task || e.context.record;
			d = true;
			a.set = function() {
				delete a.set;
				d = false;
				c.field.applyChanges(a)
			}
		}
		this.callParent(arguments);
		if (d) {
			delete a.set
		}
		this.unbindPositionFixer()
	},
	showEditor: function(a, b, c) {
		var f = this.grid.getSelectionModel();
		var e = f.selectByPosition;
		f.selectByPosition = Ext.emptyFn;
		var d;
		if (a.field && a.field.setSuppressTaskUpdate) {
			d = a.field.getSuppressTaskUpdate();
			a.field.setSuppressTaskUpdate(true)
		}
		this.callParent(arguments);
		if (a.field && a.field.setSuppressTaskUpdate) {
			a.field.setSuppressTaskUpdate(d)
		}
		f.selectByPosition = e;
		this.bindPositionFixer()
	},
	cancelEdit: function() {
		this.callParent(arguments);
		this.unbindPositionFixer()
	}
});
Ext.define("Sch.plugin.ResourceZones", {
	extend: "Sch.plugin.Zones",
	alias: "plugin.scheduler_resourcezones",
	innerTpl: null,
	store: null,
	cls: "sch-resourcezone",
	init: function(a) {
		this.uniqueCls = this.uniqueCls || ("sch-timespangroup-" + Ext.id());
		this.scheduler = a;
		a.on("destroy", this.onSchedulerDestroy, this);
		a.registerRenderer(this.renderer, this);
		if (Ext.isString(this.innerTpl)) {
			this.innerTpl = new Ext.XTemplate(this.innerTpl)
		}
		var b = this.innerTpl;
		if (!this.template) {
			this.template = new Ext.XTemplate('<tpl for="."><div id="' + this.uniqueCls + '-{id}" class="' + this.cls + " " + this.uniqueCls + ' {Cls}" style="' + (a.rtl ? "right": "left") + ':{start}px;width:{width}px;top:{start}px;height:{width}px;{style}">' + (b ? "{[this.renderInner(values)]}": "") + "</div></tpl>", {
				renderInner: function(c) {
					return b.apply(c)
				}
			})
		}
		this.storeListeners = {
			load: this.fullRefresh,
			datachanged: this.fullRefresh,
			clear: this.fullRefresh,
			add: this.fullRefresh,
			remove: this.fullRefresh,
			update: this.refreshSingle,
			scope: this
		};
		this.store.on(this.storeListeners)
	},
	onSchedulerDestroy: function() {
		this.store.un(this.storeListeners)
	},
	fullRefresh: function() {
		this.scheduler.getSchedulingView().refresh()
	},
	renderer: function(c, b, a, d) {
		if (this.scheduler.getOrientation() === "horizontal" || d === 0) {
			return this.renderZones(a)
		}
		return ""
	},
	renderZones: function(f) {
		var a = this.store,
		c = this.scheduler,
		h = c.timeAxis.getStart(),
		b = c.timeAxis.getEnd(),
		e = [],
		d,
		g;
		a.each(function(i) {
			d = i.getStartDate();
			g = i.getEndDate();
			if (i.getResource() === f && d && g && Sch.util.Date.intersectSpans(d, g, h, b)) {
				var k = c.getSchedulingView()[c.getOrientation()].getEventRenderData(i);
				var l,
				j;
				if (c.getOrientation() === "horizontal") {
					l = c.rtl ? k.right: k.left;
					j = k.width
				} else {
					l = k.top;
					j = k.height
				}
				e[e.length] = Ext.apply({
					id: i.internalId,
					start: l,
					width: j,
					Cls: i.getCls()
				},
				i.data)
			}
		});
		return this.template.apply(e)
	},
	refreshSingle: function(i, g) {
		var c = Ext.get(this.uniqueCls + "-" + g.internalId);
		if (c) {
			var e = this.scheduler,
			f = e.timeAxis.getStart(),
			j = e.timeAxis.getEnd();
			var b = Sch.util.Date.max(f, g.getStartDate()),
			d = Sch.util.Date.min(j, g.getEndDate()),
			k = g.getCls();
			var h = e.getSchedulingView().getCoordinateFromDate(b);
			var a = e.getSchedulingView().getCoordinateFromDate(d) - h;
			c.dom.className = this.cls + " " + this.uniqueCls + " " + (k || "");
			c.setStyle({
				left: h + "px",
				top: h + "px",
				height: a + "px",
				width: a + "px"
			})
		}
	}
});
Ext.define("Sch.widget.ResizePicker", {
	extend: "Ext.Panel",
	alias: "widget.dualrangepicker",
	width: 200,
	height: 200,
	border: true,
	collapsible: false,
	bodyStyle: "position:absolute; margin:5px",
	verticalCfg: {
		height: 120,
		value: 24,
		increment: 2,
		minValue: 20,
		maxValue: 80,
		reverse: true,
		disabled: true
	},
	horizontalCfg: {
		width: 120,
		value: 100,
		minValue: 25,
		increment: 5,
		maxValue: 200,
		disable: true
	},
	initComponent: function() {
		var a = this;
		a.addEvents("change", "changecomplete", "select");
		a.horizontalCfg.value = a.dialogConfig.columnWidth;
		a.verticalCfg.value = a.dialogConfig.rowHeight;
		a.verticalCfg.disabled = a.dialogConfig.scrollerDisabled || false;
		a.dockedItems = [a.vertical = new Ext.slider.Single(Ext.apply({
			dock: "left",
			style: "margin-top:10px",
			vertical: true,
			listeners: {
				change: a.onSliderChange,
				changecomplete: a.onSliderChangeComplete,
				scope: a
			}
		},
		a.verticalCfg)), a.horizontal = new Ext.slider.Single(Ext.apply({
			dock: "top",
			style: "margin-left:28px",
			listeners: {
				change: a.onSliderChange,
				changecomplete: a.onSliderChangeComplete,
				scope: a
			}
		},
		a.horizontalCfg))];
		a.callParent(arguments)
	},
	afterRender: function() {
		var b = this;
		b.addCls("sch-ux-range-picker");
		b.valueHandle = this.body.createChild({
			cls: "sch-ux-range-value",
			cn: {
				tag: "span"
			}
		});
		b.valueSpan = this.valueHandle.down("span");
		var a = new Ext.dd.DD(this.valueHandle);
		Ext.apply(a, {
			startDrag: function() {
				b.dragging = true;
				this.constrainTo(b.body)
			},
			onDrag: function() {
				b.onHandleDrag.apply(b, arguments)
			},
			endDrag: function() {
				b.onHandleEndDrag.apply(b, arguments);
				b.dragging = false
			},
			scope: this
		});
		this.setValues(this.getValues());
		this.callParent(arguments);
		this.body.on("click", this.onBodyClick, this)
	},
	onBodyClick: function(c, a) {
		var b = [c.getXY()[0] - 8 - this.body.getX(), c.getXY()[1] - 8 - this.body.getY()];
		this.valueHandle.setLeft(Ext.Number.constrain(b[0], 0, this.getAvailableWidth()));
		this.valueHandle.setTop(Ext.Number.constrain(b[1], 0, this.getAvailableHeight()));
		this.setValues(this.getValuesFromXY([this.valueHandle.getLeft(true), this.valueHandle.getTop(true)]));
		this.onSliderChangeComplete()
	},
	getAvailableWidth: function() {
		return this.body.getWidth() - 18
	},
	getAvailableHeight: function() {
		return this.body.getHeight() - 18
	},
	onHandleDrag: function() {
		this.setValues(this.getValuesFromXY([this.valueHandle.getLeft(true), this.valueHandle.getTop(true)]))
	},
	onHandleEndDrag: function() {
		this.setValues(this.getValuesFromXY([this.valueHandle.getLeft(true), this.valueHandle.getTop(true)]))
	},
	getValuesFromXY: function(d) {
		var c = d[0] / this.getAvailableWidth();
		var a = d[1] / this.getAvailableHeight();
		var e = Math.round((this.horizontalCfg.maxValue - this.horizontalCfg.minValue) * c);
		var b = Math.round((this.verticalCfg.maxValue - this.verticalCfg.minValue) * a) + this.verticalCfg.minValue;
		return [e + this.horizontalCfg.minValue, b]
	},
	getXYFromValues: function(d) {
		var b = this.horizontalCfg.maxValue - this.horizontalCfg.minValue;
		var f = this.verticalCfg.maxValue - this.verticalCfg.minValue;
		var a = Math.round((d[0] - this.horizontalCfg.minValue) * this.getAvailableWidth() / b);
		var c = d[1] - this.verticalCfg.minValue;
		var e = Math.round(c * this.getAvailableHeight() / f);
		return [a, e]
	},
	updatePosition: function() {
		var a = this.getValues();
		var b = this.getXYFromValues(a);
		this.valueHandle.setLeft(Ext.Number.constrain(b[0], 0, this.getAvailableWidth()));
		if (this.verticalCfg.disabled) {
			this.valueHandle.setTop(this.dialogConfig.rowHeight)
		} else {
			this.valueHandle.setTop(Ext.Number.constrain(b[1], 0, this.getAvailableHeight()))
		}
		this.positionValueText();
		this.setValueText(a)
	},
	positionValueText: function() {
		var a = this.valueHandle.getTop(true);
		var b = this.valueHandle.getLeft(true);
		this.valueSpan.setLeft(b > 30 ? -30: 10);
		this.valueSpan.setTop(a > 10 ? -20: 20)
	},
	setValueText: function(a) {
		if (this.verticalCfg.disabled) {
			a[1] = this.dialogConfig.rowHeight
		}
		this.valueSpan.update("[" + a.toString() + "]")
	},
	setValues: function(a) {
		this.horizontal.setValue(a[0]);
		if (this.verticalCfg.reverse) {
			if (!this.verticalCfg.disabled) {
				this.vertical.setValue(this.verticalCfg.maxValue + this.verticalCfg.minValue - a[1])
			}
		} else {
			if (!this.verticalCfg.disabled) {
				this.vertical.setValue(a[1])
			}
		}
		if (!this.dragging) {
			this.updatePosition()
		}
		this.positionValueText();
		this.setValueText(a)
	},
	getValues: function() {
		if (!this.verticalCfg.disabled) {
			var a = this.vertical.getValue();
			if (this.verticalCfg.reverse) {
				a = this.verticalCfg.maxValue - a + this.verticalCfg.minValue
			}
			return [this.horizontal.getValue(), a]
		}
		return [this.horizontal.getValue()]
	},
	onSliderChange: function() {
		this.fireEvent("change", this, this.getValues());
		if (!this.dragging) {
			this.updatePosition()
		}
	},
	onSliderChangeComplete: function() {
		this.fireEvent("changecomplete", this, this.getValues())
	},
	afterLayout: function() {
		this.callParent(arguments);
		this.updatePosition()
	}
});
Ext.define("Sch.widget.ExportDialogForm", {
	extend: "Ext.form.Panel",
	requires: ["Ext.ProgressBar", "Ext.form.field.ComboBox", "Ext.form.field.Date", "Ext.form.FieldContainer", "Ext.form.field.Checkbox", "Sch.widget.ResizePicker"],
	border: false,
	bodyPadding: "10 10 0 10",
	autoHeight: true,
	initComponent: function() {
		var a = this;
		if (Ext.getVersion("extjs").isLessThan("4.2.1")) {
			if (typeof Ext.tip !== "undefined" && Ext.tip.Tip && Ext.tip.Tip.prototype.minWidth != "auto") {
				Ext.tip.Tip.prototype.minWidth = "auto"
			}
		}
		a.createFields();
		Ext.apply(this, {
			fieldDefaults: {
				labelAlign: "left",
				labelWidth: 120,
				anchor: "99%"
			},
			items: [a.rangeField, a.resizerHolder, a.datesHolder, a.showHeaderField, a.exportToSingleField, a.formatField, a.orientationField, a.progressBar || a.createProgressBar()]
		});
		a.callParent(arguments);
		a.onRangeChange(null, a.dialogConfig.defaultConfig.range);
		a.on({
			hideprogressbar: a.hideProgressBar,
			showprogressbar: a.showProgressBar,
			updateprogressbar: a.updateProgressBar,
			scope: a
		})
	},
	isValid: function() {
		var a = this;
		if (a.rangeField.getValue() === "date") {
			return a.dateFromField.isValid() && a.dateToField.isValid()
		}
		return true
	},
	getValues: function(e, c, d, b) {
		var a = this.callParent(arguments);
		var f = this.resizePicker.getValues();
		if (!e) {
			a.cellSize = f
		} else {
			a += "&cellSize[0]=" + f[0] + "&cellSize[1]=" + f[1]
		}
		return a
	},
	createFields: function() {
		var d = this,
		a = d.dialogConfig,
		f = '<table class="sch-fieldcontainer-label-wrap"><td width="1" class="sch-fieldcontainer-label">',
		e = '<td><div class="sch-fieldcontainer-separator"></div></table>';
		d.rangeField = new Ext.form.field.ComboBox({
			value: a.defaultConfig.range,
			triggerAction: "all",
			cls: "sch-export-dialog-range",
			forceSelection: true,
			editable: false,
			fieldLabel: a.rangeFieldLabel,
			name: "range",
			queryMode: "local",
			displayField: "name",
			valueField: "value",
			store: Ext.create("Ext.data.Store", {
				fields: ["name", "value"],
				data: [{
					name: a.completeViewText,
					value: "complete"
				},
				{
					name: a.dateRangeText,
					value: "date"
				},
				{
					name: a.currentViewText,
					value: "current"
				}]
			}),
			listeners: {
				change: d.onRangeChange,
				scope: d
			}
		});
		d.resizePicker = new Sch.widget.ResizePicker({
			dialogConfig: a,
			margin: "10 20"
		});
		d.resizerHolder = new Ext.form.FieldContainer({
			fieldLabel: a.scrollerDisabled ? a.adjustCols: a.adjustColsAndRows,
			labelAlign: "top",
			hidden: true,
			labelSeparator: "",
			beforeLabelTextTpl: f,
			afterLabelTextTpl: e,
			layout: "vbox",
			defaults: {
				flex: 1,
				allowBlank: false
			},
			items: [d.resizePicker]
		});
		d.dateFromField = new Ext.form.field.Date({
			fieldLabel: a.dateRangeFromText,
			baseBodyCls: "sch-exportdialogform-date",
			name: "dateFrom",
			format: a.dateRangeFormat || Ext.Date.defaultFormat,
			allowBlank: false,
			maxValue: a.endDate,
			minValue: a.startDate,
			value: a.startDate
		});
		d.dateToField = new Ext.form.field.Date({
			fieldLabel: a.dateRangeToText,
			name: "dateTo",
			format: a.dateRangeFormat || Ext.Date.defaultFormat,
			baseBodyCls: "sch-exportdialogform-date",
			allowBlank: false,
			maxValue: a.endDate,
			minValue: a.startDate,
			value: a.endDate
		});
		d.datesHolder = new Ext.form.FieldContainer({
			fieldLabel: a.specifyDateRange,
			labelAlign: "top",
			hidden: true,
			labelSeparator: "",
			beforeLabelTextTpl: f,
			afterLabelTextTpl: e,
			layout: "vbox",
			defaults: {
				flex: 1,
				allowBlank: false
			},
			items: [d.dateFromField, d.dateToField]
		});
		d.showHeaderField = new Ext.form.field.Checkbox({
			xtype: "checkboxfield",
			boxLabel: d.dialogConfig.showHeaderLabel,
			name: "showHeader",
			checked: !!a.defaultConfig.showHeaderLabel
		});
		d.exportToSingleField = new Ext.form.field.Checkbox({
			xtype: "checkboxfield",
			boxLabel: d.dialogConfig.exportToSingleLabel,
			name: "singlePageExport",
			checked: !!a.defaultConfig.singlePageExport
		});
		d.formatField = new Ext.form.field.ComboBox({
			value: a.defaultConfig.format,
			triggerAction: "all",
			forceSelection: true,
			editable: false,
			fieldLabel: a.formatFieldLabel,
			name: "format",
			queryMode: "local",
			store: ["A5", "A4", "A3", "Letter", "Legal"]
		});
		var c = a.defaultConfig.orientation === "portrait" ? 'class="sch-none"': "",
		b = a.defaultConfig.orientation === "landscape" ? 'class="sch-none"': "";
		d.orientationField = new Ext.form.field.ComboBox({
			value: a.defaultConfig.orientation,
			triggerAction: "all",
			baseBodyCls: "sch-exportdialogform-orientation",
			forceSelection: true,
			editable: false,
			fieldLabel: d.dialogConfig.orientationFieldLabel,
			afterSubTpl: new Ext.XTemplate('<span id="sch-exportdialog-imagePortrait" ' + b + '></span><span id="sch-exportdialog-imageLandscape" ' + c + "></span>"),
			name: "orientation",
			displayField: "name",
			valueField: "value",
			queryMode: "local",
			store: Ext.create("Ext.data.Store", {
				fields: ["name", "value"],
				data: [{
					name: a.orientationPortraitText,
					value: "portrait"
				},
				{
					name: a.orientationLandscapeText,
					value: "landscape"
				}]
			}),
			listeners: {
				change: function(h, g) {
					switch (g) {
					case "landscape":
						Ext.fly("sch-exportdialog-imagePortrait").toggleCls("sch-none");
						Ext.fly("sch-exportdialog-imageLandscape").toggleCls("sch-none");
						break;
					case "portrait":
						Ext.fly("sch-exportdialog-imagePortrait").toggleCls("sch-none");
						Ext.fly("sch-exportdialog-imageLandscape").toggleCls("sch-none");
						break
					}
				}
			}
		})
	},
	createProgressBar: function() {
		return this.progressBar = new Ext.ProgressBar({
			text: this.config.progressBarText,
			animate: true,
			hidden: true,
			margin: "4px 0 10px 0"
		})
	},
	onRangeChange: function(b, a) {
		switch (a) {
		case "complete":
			this.datesHolder.hide();
			this.resizerHolder.hide();
			break;
		case "date":
			this.datesHolder.show();
			this.resizerHolder.hide();
			break;
		case "current":
			this.datesHolder.hide();
			this.resizerHolder.show();
			this.resizePicker.expand(true);
			break
		}
	},
	showProgressBar: function() {
		if (this.progressBar) {
			this.progressBar.show()
		}
	},
	hideProgressBar: function() {
		if (this.progressBar) {
			this.progressBar.hide()
		}
	},
	updateProgressBar: function(a) {
		if (this.progressBar) {
			this.progressBar.updateProgress(a)
		}
	}
});
Ext.define("Sch.widget.ExportDialog", {
	alternateClassName: "Sch.widget.PdfExportDialog",
	extend: "Ext.window.Window",
	requires: ["Sch.widget.ExportDialogForm"],
	mixins: ["Sch.mixin.Localizable"],
	alias: "widget.exportdialog",
	modal: false,
	width: 350,
	cls: "sch-exportdialog",
	frame: false,
	layout: "fit",
	draggable: true,
	padding: 0,
	plugin: null,
	buttonsPanel: null,
	buttonsPanelScope: null,
	progressBar: null,
	dateRangeFormat: "",
	constructor: function(a) {
		Ext.apply(this, a.exportDialogConfig);
		Ext.Array.forEach(["generalError", "title", "formatFieldLabel", "orientationFieldLabel", "rangeFieldLabel", "showHeaderLabel", "orientationPortraitText", "orientationLandscapeText", "completeViewText", "currentViewText", "dateRangeText", "dateRangeFromText", "pickerText", "dateRangeToText", "exportButtonText", "cancelButtonText", "progressBarText", "exportToSingleLabel"],
		function(b) {
			if (b in a) {
				this[b] = a[b]
			}
		},
		this);
		this.title = this.L("title");
		this.config = Ext.apply({
			progressBarText: this.L("progressBarText"),
			dateRangeToText: this.L("dateRangeToText"),
			pickerText: this.L("pickerText"),
			dateRangeFromText: this.L("dateRangeFromText"),
			dateRangeText: this.L("dateRangeText"),
			currentViewText: this.L("currentViewText"),
			formatFieldLabel: this.L("formatFieldLabel"),
			orientationFieldLabel: this.L("orientationFieldLabel"),
			rangeFieldLabel: this.L("rangeFieldLabel"),
			showHeaderLabel: this.L("showHeaderLabel"),
			exportToSingleLabel: this.L("exportToSingleLabel"),
			orientationPortraitText: this.L("orientationPortraitText"),
			orientationLandscapeText: this.L("orientationLandscapeText"),
			completeViewText: this.L("completeViewText"),
			adjustCols: this.L("adjustCols"),
			adjustColsAndRows: this.L("adjustColsAndRows"),
			specifyDateRange: this.L("specifyDateRange"),
			dateRangeFormat: this.dateRangeFormat,
			defaultConfig: this.defaultConfig
		},
		a.exportDialogConfig);
		this.callParent(arguments)
	},
	initComponent: function() {
		var b = this,
		a = {
			hidedialogwindow: b.destroy,
			showdialogerror: b.showError,
			updateprogressbar: function(c) {
				b.fireEvent("updateprogressbar", c)
			},
			scope: this
		};
		b.form = b.buildForm(b.config);
		Ext.apply(this, {
			items: b.form,
			fbar: b.buildButtons(b.buttonsPanelScope || b)
		});
		b.callParent(arguments);
		b.plugin.on(a)
	},
	afterRender: function() {
		var a = this;
		a.relayEvents(a.form.resizePicker, ["change", "changecomplete", "select"]);
		a.form.relayEvents(a, ["updateprogressbar", "hideprogressbar", "showprogressbar"]);
		a.callParent(arguments)
	},
	buildButtons: function(a) {
		return [{
			xtype: "button",
			scale: "medium",
			text: this.L("exportButtonText"),
			handler: function() {
				if (this.form.isValid()) {
					this.fireEvent("showprogressbar");
					this.plugin.doExport(this.form.getValues())
				}
			},
			scope: a
		},
		{
			xtype: "button",
			scale: "medium",
			text: this.L("cancelButtonText"),
			handler: function() {
				this.destroy()
			},
			scope: a
		}]
	},
	buildForm: function(a) {
		return new Sch.widget.ExportDialogForm({
			progressBar: this.progressBar,
			dialogConfig: a
		})
	},
	showError: function(b, a) {
		var c = b,
		d = a || c.L("generalError");
		c.fireEvent("hideprogressbar");
		Ext.Msg.alert("", d)
	}
});
Ext.define("Sch.feature.ColumnLines", {
	extend: "Sch.plugin.Lines",
	cls: "sch-column-line",
	showTip: false,
	requires: ["Ext.data.JsonStore"],
	init: function(a) {
		this.timeAxis = a.getTimeAxis();
		this.store = Ext.create("Ext.data.JsonStore", {
			fields: ["Date"],
			data: a.getOrientation() === "horizontal" ? this.getData() : []
		});
		this.callParent(arguments);
		this.panel = a;
		this.panel.on({
			orientationchange: this.populate,
			destroy: this.onHostDestroy,
			scope: this
		});
		this.timeAxis.on("reconfigure", this.populate, this)
	},
	onHostDestroy: function() {
		this.timeAxis.un("reconfigure", this.populate, this)
	},
	populate: function() {
		var a = this.panel;
		var b = a.getOrientation() === "horizontal" && a.getStore().getCount() > 0;
		this.store.removeAll(b);
		this.store.add(this.getData())
	},
	getElementData: function() {
		var a = this.schedulerView;
		if (a.getOrientation() === "horizontal" && a.store.getCount() > 0) {
			return this.callParent(arguments)
		}
		return []
	},
	getData: function() {
		var a = [];
		this.timeAxis.forEachMainInterval(function(d, b, c) {
			if (c > 0) {
				a.push({
					Date: d
				})
			}
		});
		return a
	}
});
Ext.define("Sch.mixin.AbstractTimelineView", {
	requires: ["Sch.data.TimeAxis", "Sch.view.Horizontal"],
	selectedEventCls: "sch-event-selected",
	readOnly: false,
	horizontalViewClass: "Sch.view.Horizontal",
	timeCellCls: "sch-timetd",
	timeCellSelector: ".sch-timetd",
	eventBorderWidth: 1,
	timeAxis: null,
	timeAxisViewModel: null,
	eventPrefix: null,
	rowHeight: null,
	orientation: "horizontal",
	horizontal: null,
	vertical: null,
	secondaryCanvasEl: null,
	panel: null,
	displayDateFormat: null,
	snapToIncrement: null,
	el: null,
	_initializeTimelineView: function() {
		if (this.horizontalViewClass) {
			this.horizontal = Ext.create(this.horizontalViewClass, {
				view: this
			})
		}
		if (this.verticalViewClass) {
			this.vertical = Ext.create(this.verticalViewClass, {
				view: this
			})
		}
		var a = this.eventPrefix || this.getId();
		if (!a) {
			throw "No event prefix specified for the scheduler"
		}
		Ext.apply(this, {
			eventPrefix: a + "-"
		})
	},
	getTimeAxisViewModel: function() {
		return this.timeAxisViewModel
	},
	getFormattedDate: function(a) {
		return Ext.Date.format(a, this.getDisplayDateFormat())
	},
	getFormattedEndDate: function(c, a) {
		var b = this.getDisplayDateFormat();
		if (c.getHours() === 0 && c.getMinutes() === 0 && !(c.getYear() === a.getYear() && c.getMonth() === a.getMonth() && c.getDate() === a.getDate()) && !Sch.util.Date.hourInfoRe.test(b.replace(Sch.util.Date.stripEscapeRe, ""))) {
			c = Sch.util.Date.add(c, Sch.util.Date.DAY, -1)
		}
		return Ext.Date.format(c, b)
	},
	getDisplayDateFormat: function() {
		return this.displayDateFormat
	},
	setDisplayDateFormat: function(a) {
		this.displayDateFormat = a
	},
	fitColumns: function(b) {
		if (this.orientation === "horizontal") {
			this.getTimeAxisViewModel().fitToAvailableWidth(b)
		} else {
			var a = Math.floor((this.panel.getWidth() - Ext.getScrollbarSize().width - 1) / this.headerCt.getColumnCount());
			this.setColumnWidth(a, b)
		}
	},
	getElementFromEventRecord: function(a) {
		return Ext.get(this.eventPrefix + a.internalId)
	},
	getEventNodeByRecord: function(a) {
		return document.getElementById(this.eventPrefix + a.internalId)
	},
	getEventNodesByRecord: function(a) {
		return this.el.select("[id=" + this.eventPrefix + a.internalId + "]")
	},
	getStartEndDatesFromRegion: function(b, a) {
		return this[this.orientation].getStartEndDatesFromRegion(b, a)
	},
	getTimeResolution: function() {
		return this.timeAxis.getResolution()
	},
	setTimeResolution: function(b, a) {
		this.timeAxis.setResolution(b, a);
		if (this.snapToIncrement) {
			this.refreshKeepingScroll()
		}
	},
	getEventIdFromDomNodeId: function(a) {
		return a.substring(this.eventPrefix.length)
	},
	getDateFromDomEvent: function(b, a) {
		return this.getDateFromXY(b.getXY(), a)
	},
	getSnapPixelAmount: function() {
		return this.getTimeAxisViewModel().getSnapPixelAmount()
	},
	getTimeColumnWidth: function() {
		return this.getTimeAxisViewModel().getTickWidth()
	},
	setSnapEnabled: function(a) {
		this.snapToIncrement = a;
		if (a) {
			this.refreshKeepingScroll()
		}
	},
	setReadOnly: function(a) {
		this.readOnly = a;
		this[a ? "addCls": "removeCls"](this._cmpCls + "-readonly")
	},
	isReadOnly: function() {
		return this.readOnly
	},
	setOrientation: function(a) {
		this.orientation = a
	},
	getOrientation: function() {
		return this.orientation
	},
	getDateFromXY: function(c, b, a) {
		return this.getDateFromCoordinate(this.orientation === "horizontal" ? c[0] : c[1], b, a)
	},
	getDateFromCoordinate: function(c, b, a) {
		if (!a) {
			c = this[this.orientation].translateToScheduleCoordinate(c)
		}
		return this.timeAxisViewModel.getDateFromPosition(c, b)
	},
	getDateFromX: function(a, b) {
		return this.getDateFromCoordinate(a, b)
	},
	getDateFromY: function(b, a) {
		return this.getDateFromCoordinate(b, a)
	},
	getCoordinateFromDate: function(a, b) {
		var c = this.timeAxisViewModel.getPositionFromDate(a);
		if (b === false) {
			c = this[this.orientation].translateToPageCoordinate(c)
		}
		return Math.round(c)
	},
	getXFromDate: function(a, b) {
		return this.getCoordinateFromDate(a, b)
	},
	getYFromDate: function(a, b) {
		return this.getCoordinateFromDate(a, b)
	},
	getTimeSpanDistance: function(a, b) {
		return this.timeAxisViewModel.getDistanceBetweenDates(a, b)
	},
	getTimeSpanRegion: function(a, b) {
		return this[this.orientation].getTimeSpanRegion(a, b)
	},
	getScheduleRegion: function(b, a) {
		return this[this.orientation].getScheduleRegion(b, a)
	},
	getTableRegion: function() {
		throw "Abstract method call"
	},
	getRowNode: function(a) {
		throw "Abstract method call"
	},
	getRecordForRowNode: function(a) {
		throw "Abstract method call"
	},
	getVisibleDateRange: function() {
		return this[this.orientation].getVisibleDateRange()
	},
	setColumnWidth: function(b, a) {
		this[this.orientation].setColumnWidth(b, a)
	},
	findRowByChild: function(a) {
		throw "Abstract method call"
	},
	setBarMargin: function(b, a) {
		this.barMargin = b;
		if (!a) {
			this.refreshKeepingScroll()
		}
	},
	getRowHeight: function() {
		return this.rowHeight
	},
	setRowHeight: function(a, b) {
		this.rowHeight = a || 24;
		if (this.orientation === "vertical") {
			this.timeAxisViewModel.setTickWidth(this.rowHeight, b)
		} else {
			if (this.getEl() && !b) {
				this.refreshKeepingScroll()
			}
		}
	},
	refreshKeepingScroll: function() {
		throw "Abstract method call"
	},
	scrollVerticallyTo: function(b, a) {
		throw "Abstract method call"
	},
	scrollHorizontallyTo: function(a, b) {
		throw "Abstract method call"
	},
	getVerticalScroll: function() {
		throw "Abstract method call"
	},
	getHorizontalScroll: function() {
		throw "Abstract method call"
	},
	getEl: Ext.emptyFn,
	getSecondaryCanvasEl: function() {
		if (!this.secondaryCanvasEl) {
			this.secondaryCanvasEl = this.getEl().createChild({
				cls: "sch-secondary-canvas"
			})
		}
		return this.secondaryCanvasEl
	},
	getScroll: function() {
		throw "Abstract method call"
	},
	getOuterEl: function() {
		return this.getEl()
	},
	getRowContainerEl: function() {
		return this.getEl()
	},
	getScrollEventSource: function() {
		return this.getEl()
	},
	getViewportHeight: function() {
		return this.getEl().getHeight()
	},
	getViewportWidth: function() {
		return this.getEl().getWidth()
	},
	getDateConstraints: Ext.emptyFn
});
Ext.apply(Sch, {
	VERSION: "2.2.9"
});
Ext.define("Sch.mixin.TimelineView", {
	extend: "Sch.mixin.AbstractTimelineView",
	requires: ["Sch.patches.ElementScroll"],
	overScheduledEventClass: "sch-event-hover",
	altColCls: "sch-col-alt",
	timeCellCls: "sch-timetd",
	timeCellSelector: ".sch-timetd",
	ScheduleEventMap: {
		click: "Click",
		mousedown: "MouseDown",
		mouseup: "MouseUp",
		dblclick: "DblClick",
		contextmenu: "ContextMenu",
		keydown: "KeyDown",
		keyup: "KeyUp"
	},
	_initializeTimelineView: function() {
		this.callParent(arguments);
		this.timeCellSelector = "." + this.timeCellCls;
		this.on("destroy", this._onDestroy, this);
		this.on("afterrender", this._onAfterRender, this);
		this.setOrientation(this.orientation);
		this.addEvents("beforetooltipshow", "columnwidthchange");
		this.enableBubble("columnwidthchange");
		this.addCls("sch-timelineview");
		if (this.readOnly) {
			this.addCls(this._cmpCls + "-readonly")
		}
		this.addCls(this._cmpCls);
		if (this.eventAnimations) {
			this.addCls("sch-animations-enabled")
		}
	},
	inheritables: function() {
		return {
			processUIEvent: function(d) {
				var a = d.getTarget(this.eventSelector),
				c = this.ScheduleEventMap,
				b = d.type,
				f = false;
				if (a && b in c) {
					this.fireEvent(this.scheduledEventName + b, this, this.resolveEventRecord(a), d);
					f = !(this.getSelectionModel() instanceof Ext.selection.RowModel)
				}
				if (!f) {
					return this.callParent(arguments)
				}
			}
		}
	},
	_onDestroy: function() {
		if (this.tip) {
			this.tip.destroy()
		}
	},
	_onAfterRender: function() {
		if (this.overScheduledEventClass) {
			this.setMouseOverEnabled(true)
		}
		if (this.tooltipTpl) {
			this.el.on("mousemove", this.setupTooltip, this, {
				single: true
			})
		}
		var a = this.bufferedRenderer;
		if (a) {
			this.patchBufferedRenderingPlugin(a);
			this.patchBufferedRenderingPlugin(this.lockingPartner.bufferedRenderer)
		}
		this.on("bufferedrefresh", this.onBufferedRefresh, this, {
			buffer: 10
		});
		this.setupTimeCellEvents();
		if (!this.secondaryCanvasEl) {
			this.secondaryCanvasEl = this.getEl().createChild({
				cls: "sch-secondary-canvas"
			})
		}
	},
	patchBufferedRenderingPlugin: function(c) {
		var b = this;
		var a = c.setBodyTop;
		c.setBodyTop = function(d, e) {
			if (d < 0) {
				d = 0
			}
			var f = a.apply(this, arguments);
			b.fireEvent("bufferedrefresh", this);
			return f
		}
	},
	onBufferedRefresh: function() {
		this.getSecondaryCanvasEl().dom.style.top = this.body.dom.style.top
	},
	setMouseOverEnabled: function(a) {
		this[a ? "mon": "mun"](this.el, {
			mouseover: this.onMouseOver,
			mouseout: this.onMouseOut,
			delegate: this.eventSelector,
			scope: this
		})
	},
	onMouseOver: function(c, a) {
		if (a !== this.lastItem) {
			this.lastItem = a;
			Ext.fly(a).addCls(this.overScheduledEventClass);
			var b = this.resolveEventRecord(a);
			if (b) {
				this.fireEvent("eventmouseenter", this, b, c)
			}
		}
	},
	onMouseOut: function(b, a) {
		if (this.lastItem) {
			if (!b.within(this.lastItem, true, true)) {
				Ext.fly(this.lastItem).removeCls(this.overScheduledEventClass);
				this.fireEvent("eventmouseleave", this, this.resolveEventRecord(this.lastItem), b);
				delete this.lastItem
			}
		}
	},
	highlightItem: function(b) {
		if (b) {
			var a = this;
			a.clearHighlight();
			a.highlightedItem = b;
			Ext.fly(b).addCls(a.overItemCls)
		}
	},
	setupTooltip: function() {
		var b = this,
		a = Ext.apply({
			renderTo: Ext.getBody(),
			delegate: b.eventSelector,
			target: b.el,
			anchor: "b",
			rtl: b.rtl,
			show: function() {
				Ext.ToolTip.prototype.show.apply(this, arguments);
				if (this.triggerElement && b.getOrientation() === "horizontal") {
					this.setX(this.targetXY[0] - 10);
					this.setY(Ext.fly(this.triggerElement).getY() - this.getHeight() - 10)
				}
			}
		},
		b.tipCfg);
		b.tip = Ext.create("Ext.ToolTip", a);
		b.tip.on({
			beforeshow: function(d) {
				if (!d.triggerElement || !d.triggerElement.id) {
					return false
				}
				var c = this.resolveEventRecord(d.triggerElement);
				if (!c || this.fireEvent("beforetooltipshow", this, c) === false) {
					return false
				}
				d.update(this.tooltipTpl.apply(this.getDataForTooltipTpl(c)))
			},
			scope: this
		})
	},
	getTimeAxisColumn: function() {
		if (!this.timeAxisColumn) {
			this.timeAxisColumn = this.headerCt.down("timeaxiscolumn")
		}
		return this.timeAxisColumn
	},
	getDataForTooltipTpl: function(a) {
		return Ext.apply({
			_record: a
		},
		a.data)
	},
	refreshKeepingScroll: function() {
		Ext.suspendLayouts();
		this.saveScrollState();
		this.refresh();
		if (this.up("tablepanel[lockable=true]").lockedGridDependsOnSchedule) {
			this.lockingPartner.refresh()
		}
		this.restoreScrollState();
		Ext.resumeLayouts(true)
	},
	setupTimeCellEvents: function() {
		this.mon(this.el, {
			click: this.handleScheduleEvent,
			dblclick: this.handleScheduleEvent,
			contextmenu: this.handleScheduleEvent,
			scope: this
		})
	},
	getTableRegion: function() {
		var a = this.el.down("." + Ext.baseCSSPrefix + "grid-table");
		return (a || this.el).getRegion()
	},
	getRowNode: function(a) {
		return this.getNodeByRecord(a)
	},
	findRowByChild: function(a) {
		return this.findItemByChild(a)
	},
	getRecordForRowNode: function(a) {
		return this.getRecord(a)
	},
	refreshKeepingResourceScroll: function() {
		var a = this.getScroll();
		this.refresh();
		if (this.getOrientation() === "horizontal") {
			this.scrollVerticallyTo(a.top)
		} else {
			this.scrollHorizontallyTo(a.left)
		}
	},
	scrollHorizontallyTo: function(a, b) {
		var c = this.getEl();
		if (c) {
			c.scrollTo("left", Math.max(0, a), b)
		}
	},
	scrollVerticallyTo: function(c, a) {
		var b = this.getEl();
		if (b) {
			b.scrollTo("top", Math.max(0, c), a)
		}
	},
	getVerticalScroll: function() {
		var a = this.getEl();
		return a.getScroll().top
	},
	getHorizontalScroll: function() {
		var a = this.getEl();
		return a.getScroll().left
	},
	getScroll: function() {
		var a = this.getEl().getScroll();
		return {
			top: a.top,
			left: a.left
		}
	},
	getXYFromDate: function() {
		var a = this.getCoordinateFromDate.apply(this, arguments);
		return this.orientation === "horizontal" ? [a, 0] : [0, a]
	},
	handleScheduleEvent: function(a) {}
});
Ext.define("Sch.view.TimelineGridView", {
	extend: "Ext.grid.View",
	mixins: ["Sch.mixin.TimelineView"]
},
function() {
	this.override(Sch.mixin.TimelineView.prototype.inheritables() || {})
});
Ext.define("Sch.mixin.AbstractSchedulerView", {
	requires: ["Sch.eventlayout.Horizontal"],
	_cmpCls: "sch-schedulerview",
	scheduledEventName: "event",
	barMargin: 1,
	constrainDragToResource: false,
	allowOverlap: null,
	readOnly: null,
	dynamicRowHeight: true,
	managedEventSizing: true,
	eventAnimations: true,
	eventCls: "sch-event",
	verticalViewClass: null,
	eventTpl: ['<tpl for=".">', '<div unselectable="on" id="{{evt-prefix}}{id}" style="right:{right}px;left:{left}px;top:{top}px;height:{height}px;width:{width}px;{style}" class="sch-event ' + Ext.baseCSSPrefix + 'unselectable {internalCls} {cls}">', '<div unselectable="on" class="sch-event-inner {iconCls}">', "{body}", "</div>", "</div>", "</tpl>"],
	eventStore: null,
	resourceStore: null,
	_initializeSchedulerView: function() {
		this.eventSelector = "." + this.eventCls;
		this.eventLayout = {};
		if (Sch.eventlayout.Horizontal) {
			this.eventLayout.horizontal = new Sch.eventlayout.Horizontal({
				view: this
			})
		}
		if (Sch.eventlayout.Vertical) {
			this.eventLayout.vertical = new Sch.eventlayout.Vertical({
				view: this
			})
		}
		this.store = this.store || this.resourceStore;
		this.resourceStore = this.resourceStore || this.store
	},
	generateTplData: function(d, c, g) {
		var f = this[this.orientation].getEventRenderData(d),
		h = d.getStartDate(),
		b = d.getEndDate(),
		a = d.getCls() || "";
		a += " sch-event-resizable-" + d.getResizable();
		if (d.dirty) {
			a += " sch-dirty "
		}
		if (f.endsOutsideView) {
			a += " sch-event-endsoutside "
		}
		if (f.startsOutsideView) {
			a += " sch-event-startsoutside "
		}
		if (this.eventBarIconClsField) {
			a += " sch-event-withicon "
		}
		if (d.isDraggable() === false) {
			a += " sch-event-fixed "
		}
		if (b - h === 0) {
			a += " sch-event-milestone "
		}
		f.id = d.internalId;
		f.internalCls = a;
		f.start = h;
		f.end = b;
		f.iconCls = d.data[this.eventBarIconClsField] || "";
		if (this.eventRenderer) {
			var e = this.eventRenderer.call(this.eventRendererScope || this, d, c, f, g);
			if (Ext.isObject(e) && this.eventBodyTemplate) {
				f.body = this.eventBodyTemplate.apply(e)
			} else {
				f.body = e
			}
		} else {
			if (this.eventBodyTemplate) {
				f.body = this.eventBodyTemplate.apply(d.data)
			} else {
				if (this.eventBarTextField) {
					f.body = d.data[this.eventBarTextField] || ""
				}
			}
		}
		return f
	},
	resolveResource: function(a) {
		return this[this.orientation].resolveResource(a)
	},
	getResourceRegion: function(b, a, c) {
		return this[this.orientation].getResourceRegion(b, a, c)
	},
	resolveEventRecord: function(a) {
		a = a.dom ? a.dom: a;
		if (! (Ext.fly(a).hasCls(this.eventCls))) {
			a = Ext.fly(a).up(this.eventSelector)
		}
		return this.getEventRecordFromDomId(a.id)
	},
	getResourceByEventRecord: function(a) {
		return a.getResource()
	},
	getEventRecordFromDomId: function(b) {
		var a = this.getEventIdFromDomNodeId(b);
		return this.eventStore.getByInternalId(a)
	},
	isDateRangeAvailable: function(d, a, b, c) {
		return this.eventStore.isDateRangeAvailable(d, a, b, c)
	},
	getEventsInView: function() {
		var b = this.timeAxis.getStart(),
		a = this.timeAxis.getEnd();
		return this.eventStore.getEventsInTimeSpan(b, a)
	},
	getEventNodes: function() {
		return this.getEl().select(this.eventSelector)
	},
	onEventCreated: function(a) {},
	getEventStore: function() {
		return this.eventStore
	},
	registerEventEditor: function(a) {
		this.eventEditor = a
	},
	getEventEditor: function() {
		return this.eventEditor
	},
	onEventUpdate: function(b, c, a) {
		this[this.orientation].onEventUpdate(b, c, a)
	},
	onEventAdd: function(a, b) {
		this[this.orientation].onEventAdd(a, b)
	},
	onEventRemove: function(a, b) {
		this[this.orientation].onEventRemove(a, b)
	},
	bindEventStore: function(c, b) {
		var d = this;
		var a = {
			scope: d,
			refresh: d.onEventDataRefresh,
			clear: d.refresh,
			addrecords: d.onEventAdd,
			updaterecord: d.onEventUpdate,
			removerecords: d.onEventRemove,
			add: d.onEventAdd,
			update: d.onEventUpdate,
			remove: d.onEventRemove
		};
		if (!b && d.eventStore) {
			d.eventStore.setResourceStore(null);
			if (c !== d.eventStore && d.eventStore.autoDestroy) {
				d.eventStore.destroy()
			} else {
				if (d.mun) {
					d.mun(d.eventStore, a)
				} else {
					d.eventStore.un(a)
				}
			}
			if (!c) {
				if (d.loadMask && d.loadMask.bindStore) {
					d.loadMask.bindStore(null)
				}
				d.eventStore = null
			}
		}
		if (c) {
			c = Ext.data.StoreManager.lookup(c);
			if (d.mon) {
				d.mon(c, a)
			} else {
				c.on(a)
			}
			if (d.loadMask && d.loadMask.bindStore) {
				d.loadMask.bindStore(c)
			}
			d.eventStore = c;
			c.setResourceStore(d.resourceStore)
		}
		if (c && !b) {
			d.refresh()
		}
	},
	onEventDataRefresh: function() {
		this.refreshKeepingScroll()
	},
	onEventSelect: function(a) {
		var b = this.getEventNodesByRecord(a);
		if (b) {
			b.addCls(this.selectedEventCls)
		}
	},
	onEventDeselect: function(a) {
		var b = this.getEventNodesByRecord(a);
		if (b) {
			b.removeCls(this.selectedEventCls)
		}
	},
	refresh: function() {
		throw "Abstract method call"
	},
	repaintEventsForResource: function(a) {
		throw "Abstract method call"
	},
	scrollEventIntoView: function(j, e, a, n, o) {
		o = o || this;
		var l = this;
		var f = this.eventStore;
		var m = function(p) {
			if (Ext.versions.extjs) {
				l.up("panel").scrollTask.cancel()
			}
			p.scrollIntoView(l.el, true, a);
			if (e) {
				if (typeof e === "boolean") {
					p.highlight()
				} else {
					p.highlight(null, e)
				}
			}
			n && n.call(o)
		};
		if (Ext.data.TreeStore && this.resourceStore instanceof Ext.data.TreeStore) {
			var d = j.getResources();
			if (d.length > 0 && !d[0].isVisible()) {
				d[0].bubble(function(p) {
					p.expand()
				})
			}
		}
		var i = this.timeAxis;
		var c = j.getStartDate();
		var h = j.getEndDate();
		if (!i.dateInAxis(c) || !i.dateInAxis(h)) {
			var g = i.getEnd() - i.getStart();
			i.setTimeSpan(new Date(c.getTime() - g / 2), new Date(h.getTime() + g / 2))
		}
		var b = this.getElementFromEventRecord(j);
		if (b) {
			m(b)
		} else {
			var k = this.panel.verticalScroller
		}
	}
});
Ext.define("Sch.mixin.SchedulerView", {
	extend: "Sch.mixin.AbstractSchedulerView",
	requires: ["Sch.tooltip.Tooltip", "Sch.feature.DragCreator", "Sch.feature.DragDrop", "Sch.feature.ResizeZone", "Sch.column.Resource", "Sch.view.Vertical", "Sch.eventlayout.Vertical"],
	verticalViewClass: "Sch.view.Vertical",
	eventResizeHandles: "end",
	dndValidatorFn: function(b, a, c, f, d) {
		return true
	},
	resizeValidatorFn: function(c, b, a, f, d) {
		return true
	},
	createValidatorFn: function(b, a, d, c) {
		return true
	},
	_initializeSchedulerView: function() {
		this.callParent(arguments);
		this.on("destroy", this._destroy, this);
		this.on("afterrender", this._afterRender, this);
		this.trackOver = false;
		this.addEvents("eventclick", "eventmousedown", "eventmouseup", "eventdblclick", "eventcontextmenu", "eventmouseenter", "eventmouseout", "beforeeventresize", "eventresizestart", "eventpartialresize", "beforeeventresizefinalize", "eventresizeend", "beforeeventdrag", "eventdragstart", "beforeeventdropfinalize", "eventdrop", "aftereventdrop", "beforedragcreate", "dragcreatestart", "beforedragcreatefinalize", "dragcreateend", "afterdragcreate", "beforeeventadd", "scheduleclick", "scheduledblclick", "schedulecontextmenu");
		var b = this;
		if (!this.eventPrefix) {
			throw "eventPrefix missing"
		}
		if (Ext.isArray(b.eventTpl)) {
			var d = Ext.Array.clone(b.eventTpl),
			a = '<div class="sch-resizable-handle sch-resizable-handle-{0}"></div>';
			if (this.eventResizeHandles === "start" || this.eventResizeHandles === "both") {
				d.splice(2, 0, Ext.String.format(a, "start"))
			}
			if (this.eventResizeHandles === "end" || this.eventResizeHandles === "both") {
				d.splice(2, 0, Ext.String.format(a, "end"))
			}
			var c = d.join("").replace("{{evt-prefix}}", this.eventPrefix);
			b.eventTpl = Ext.create("Ext.XTemplate", c)
		}
	},
	inheritables: function() {
		return {
			loadingText: "Loading events...",
			overItemCls: "",
			setReadOnly: function(a) {
				if (this.dragCreator) {
					this.dragCreator.setDisabled(a)
				}
				this.callParent(arguments)
			},
			repaintEventsForResource: function(e, d) {
				var b = this.store.indexOf(e);
				if (this.orientation === "horizontal") {
					this.eventLayout.horizontal.clearCache(e)
				}
				if (b >= 0) {
					this.refreshNode(b);
					this.lockingPartner.refreshNode(b);
					if (d) {
						var a = this.getSelectionModel();
						var c = e.getEvents();
						Ext.each(c,
						function(f) {
							if (a.isSelected(f)) {
								this.onEventSelect(f, true)
							}
						},
						this)
					}
				}
			},
			handleScheduleEvent: function(f) {
				var i = f.getTarget("." + this.timeCellCls, 3);
				if (i) {
					var j = this.getDateFromDomEvent(f, "floor");
					var g = this.findRowByChild(i);
					var d = this.indexOf(g);
					var a;
					if (this.orientation == "horizontal") {
						a = this.getRecordForRowNode(g)
					} else {
						var b = f.getTarget(this.cellSelector, 5);
						if (b) {
							var h = typeof b.cellIndex == "number" ? b.cellIndex: b.getAttribute("data-cellIndex");
							var c = this.headerCt.getGridColumns()[h];
							a = c && c.model
						}
					}
					this.fireEvent("schedule" + f.type, this, j, d, a, f)
				}
			},
			onEventDataRefresh: function() {
				this.clearRowHeightCache();
				this.callParent(arguments)
			},
			onUnbindStore: function(a) {
				a.un({
					refresh: this.clearRowHeightCache,
					clear: this.clearRowHeightCache,
					load: this.clearRowHeightCache,
					scope: this
				});
				this.callParent(arguments)
			},
			onBindStore: function(a, b, c) {
				a.on({
					refresh: this.clearRowHeightCache,
					clear: this.clearRowHeightCache,
					load: this.clearRowHeightCache,
					scope: this
				});
				this.callParent(arguments)
			}
		}
	},
	_afterRender: function() {
		this.bindEventStore(this.eventStore, true);
		this.setupEventListeners();
		this.configureFunctionality();
		var a = this.headerCt.resizer;
		if (a) {
			a.doResize = Ext.Function.createSequence(a.doResize, this.afterHeaderResized, this)
		}
	},
	_destroy: function() {
		this.bindEventStore(null)
	},
	clearRowHeightCache: function() {
		if (this.orientation === "horizontal") {
			this.eventLayout.horizontal.clearCache()
		}
	},
	configureFunctionality: function() {
		var a = this.validatorFnScope || this;
		if (this.eventResizeHandles !== "none" && Sch.feature.ResizeZone) {
			this.resizePlug = new Sch.feature.ResizeZone(Ext.applyIf({
				schedulerView: this,
				validatorFn: function(d, c, b, e) {
					return (this.allowOverlap || this.isDateRangeAvailable(b, e, c, d)) && this.resizeValidatorFn.apply(a, arguments) !== false
				},
				validatorFnScope: this
			},
			this.resizeConfig || {}))
		}
		if (this.enableEventDragDrop !== false && Sch.feature.DragDrop) {
			this.dragdropPlug = new Sch.feature.DragDrop(this, {
				validatorFn: function(c, b, d, g, f) {
					return (this.allowOverlap || this.isDateRangeAvailable(d, Sch.util.Date.add(d, Sch.util.Date.MILLI, g), c[0], b)) && this.dndValidatorFn.apply(a, arguments) !== false
				},
				validatorFnScope: this,
				dragConfig: this.dragConfig || {},
				dropConfig: this.dropConfig || {}
			})
		}
		if (this.enableDragCreation !== false && Sch.feature.DragCreator) {
			this.dragCreator = new Sch.feature.DragCreator(Ext.applyIf({
				schedulerView: this,
				disabled: this.readOnly,
				validatorFn: function(c, b, d) {
					return (this.allowOverlap || this.isDateRangeAvailable(b, d, null, c)) && this.createValidatorFn.apply(a, arguments) !== false
				},
				validatorFnScope: this
			},
			this.createConfig || {}))
		}
	},
	onBeforeDragDrop: function(a, c, b) {
		return ! this.readOnly && !b.getTarget().className.match("sch-resizable-handle")
	},
	onDragDropStart: function() {
		if (this.dragCreator) {
			this.dragCreator.setDisabled(true)
		}
		if (this.tip) {
			this.tip.hide();
			this.tip.disable()
		}
		if (this.overScheduledEventClass) {
			this.setMouseOverEnabled(false)
		}
	},
	onDragDropEnd: function() {
		if (this.dragCreator) {
			this.dragCreator.setDisabled(false)
		}
		if (this.tip) {
			this.tip.enable()
		}
		if (this.overScheduledEventClass) {
			this.setMouseOverEnabled(true)
		}
	},
	onBeforeDragCreate: function(b, c, a, d) {
		return ! this.readOnly && !d.ctrlKey
	},
	onDragCreateStart: function() {
		if (this.overScheduledEventClass) {
			this.setMouseOverEnabled(false)
		}
		if (this.tip) {
			this.tip.hide();
			this.tip.disable()
		}
	},
	onDragCreateEnd: function(b, a, c) {
		if (!this.getEventEditor()) {
			if (this.fireEvent("beforeeventadd", this, a) !== false) {
				this.onEventCreated(a);
				this.eventStore.append(a)
			}
			this.dragCreator.getProxy().hide()
		}
		if (this.overScheduledEventClass) {
			this.setMouseOverEnabled(true)
		}
	},
	onEventCreated: function(a) {},
	onAfterDragCreate: function() {
		if (this.overScheduledEventClass) {
			this.setMouseOverEnabled(true)
		}
		if (this.tip) {
			this.tip.enable()
		}
	},
	onBeforeResize: function(a, c, b) {
		return ! this.readOnly
	},
	onResizeStart: function() {
		if (this.tip) {
			this.tip.hide();
			this.tip.disable()
		}
		if (this.dragCreator) {
			this.dragCreator.setDisabled(true)
		}
	},
	onResizeEnd: function() {
		if (this.tip) {
			this.tip.enable()
		}
		if (this.dragCreator) {
			this.dragCreator.setDisabled(false)
		}
	},
	setupEventListeners: function() {
		this.on({
			beforeeventdrag: this.onBeforeDragDrop,
			eventdragstart: this.onDragDropStart,
			aftereventdrop: this.onDragDropEnd,
			beforedragcreate: this.onBeforeDragCreate,
			dragcreatestart: this.onDragCreateStart,
			dragcreateend: this.onDragCreateEnd,
			afterdragcreate: this.onAfterDragCreate,
			beforeeventresize: this.onBeforeResize,
			eventresizestart: this.onResizeStart,
			eventresizeend: this.onResizeEnd,
			scope: this
		})
	},
	afterHeaderResized: function() {
		var b = this.headerCt.resizer;
		if (b && b.dragHd instanceof Sch.column.Resource) {
			var a = b.dragHd.getWidth();
			this.setColumnWidth(a)
		}
	},
	columnRenderer: function(e, c, a, d, b) {
		return this[this.orientation].columnRenderer(e, c, a, d, b)
	}
});
Ext.define("Sch.view.SchedulerGridView", {
	extend: "Sch.view.TimelineGridView",
	mixins: ["Sch.mixin.SchedulerView", "Sch.mixin.Localizable"],
	alias: "widget.schedulergridview"
},
function() {
	this.override(Sch.mixin.SchedulerView.prototype.inheritables() || {})
});
Ext.define("Sch.mixin.Zoomable", {
	zoomLevels: [{
		width: 80,
		increment: 5,
		resolution: 1,
		preset: "manyyears",
		resolutionUnit: "YEAR"
	},
	{
		width: 40,
		increment: 1,
		resolution: 1,
		preset: "manyyears",
		resolutionUnit: "YEAR"
	},
	{
		width: 80,
		increment: 1,
		resolution: 1,
		preset: "manyyears",
		resolutionUnit: "YEAR"
	},
	{
		width: 30,
		increment: 1,
		resolution: 1,
		preset: "year",
		resolutionUnit: "MONTH"
	},
	{
		width: 50,
		increment: 1,
		resolution: 1,
		preset: "year",
		resolutionUnit: "MONTH"
	},
	{
		width: 100,
		increment: 1,
		resolution: 1,
		preset: "year",
		resolutionUnit: "MONTH"
	},
	{
		width: 200,
		increment: 1,
		resolution: 1,
		preset: "year",
		resolutionUnit: "MONTH"
	},
	{
		width: 100,
		increment: 1,
		resolution: 7,
		preset: "monthAndYear",
		resolutionUnit: "DAY"
	},
	{
		width: 30,
		increment: 1,
		resolution: 1,
		preset: "weekDateAndMonth",
		resolutionUnit: "DAY"
	},
	{
		width: 35,
		increment: 1,
		resolution: 1,
		preset: "weekAndMonth",
		resolutionUnit: "DAY"
	},
	{
		width: 50,
		increment: 1,
		resolution: 1,
		preset: "weekAndMonth",
		resolutionUnit: "DAY"
	},
	{
		width: 20,
		increment: 1,
		resolution: 1,
		preset: "weekAndDayLetter"
	},
	{
		width: 50,
		increment: 1,
		resolution: 1,
		preset: "weekAndDay",
		resolutionUnit: "HOUR"
	},
	{
		width: 100,
		increment: 1,
		resolution: 1,
		preset: "weekAndDay",
		resolutionUnit: "HOUR"
	},
	{
		width: 50,
		increment: 6,
		resolution: 30,
		preset: "hourAndDay",
		resolutionUnit: "MINUTE"
	},
	{
		width: 100,
		increment: 6,
		resolution: 30,
		preset: "hourAndDay",
		resolutionUnit: "MINUTE"
	},
	{
		width: 60,
		increment: 2,
		resolution: 30,
		preset: "hourAndDay",
		resolutionUnit: "MINUTE"
	},
	{
		width: 60,
		increment: 1,
		resolution: 30,
		preset: "hourAndDay",
		resolutionUnit: "MINUTE"
	},
	{
		width: 30,
		increment: 15,
		resolution: 5,
		preset: "minuteAndHour"
	},
	{
		width: 60,
		increment: 15,
		resolution: 5,
		preset: "minuteAndHour"
	},
	{
		width: 130,
		increment: 15,
		resolution: 5,
		preset: "minuteAndHour"
	},
	{
		width: 60,
		increment: 5,
		resolution: 5,
		preset: "minuteAndHour"
	},
	{
		width: 100,
		increment: 5,
		resolution: 5,
		preset: "minuteAndHour"
	}],
	minZoomLevel: null,
	maxZoomLevel: null,
	visibleZoomFactor: 5,
	cachedCenterDate: null,
	isFirstZoom: true,
	isZooming: false,
	initializeZooming: function() {
		this.zoomLevels = this.zoomLevels.slice();
		this.setMinZoomLevel(this.minZoomLevel || 0);
		this.setMaxZoomLevel(this.maxZoomLevel !== null ? this.maxZoomLevel: this.zoomLevels.length - 1);
		this.on("viewchange", this.clearCenterDateCache, this)
	},
	getZoomLevelUnit: function(b) {
		var a = Sch.preset.Manager.getPreset(b.preset).headerConfig;
		return a.bottom ? a.bottom.unit: a.middle.unit
	},
	getMilliSecondsPerPixelForZoomLevel: function(b) {
		var a = Sch.util.Date;
		return Math.round((a.add(new Date(1, 0, 1), this.getZoomLevelUnit(b), b.increment) - new Date(1, 0, 1)) / b.width)
	},
	presetToZoomLevel: function(e) {
		var d = Sch.preset.Manager.getPreset(e);
		var c = d.headerConfig;
		var a = c.bottom;
		var b = c.middle;
		return {
			preset: e,
			increment: (a ? a.increment: b.increment) || 1,
			resolution: d.timeResolution.increment,
			resolutionUnit: d.timeResolution.unit,
			width: d.timeColumnWidth
		}
	},
	calculateCurrentZoomLevel: function() {
		var d = this.presetToZoomLevel(this.viewPreset);
		var c = this.timeAxis.headerConfig;
		var a = c.bottom;
		var b = c.middle;
		d.width = this.timeAxis.preset.timeColumnWidth;
		d.increment = (a ? a.increment: b.increment) || 1;
		return d
	},
	getCurrentZoomLevelIndex: function() {
		var f = this.calculateCurrentZoomLevel();
		var b = this.getMilliSecondsPerPixelForZoomLevel(f);
		var e = this.zoomLevels;
		for (var c = 0; c < e.length; c++) {
			var d = this.getMilliSecondsPerPixelForZoomLevel(e[c]);
			if (d == b) {
				return c
			}
			if (c === 0 && b > d) {
				return - 0.5
			}
			if (c == e.length - 1 && b < d) {
				return e.length - 1 + 0.5
			}
			var a = this.getMilliSecondsPerPixelForZoomLevel(e[c + 1]);
			if (d > b && b > a) {
				return c + 0.5
			}
		}
		throw "Can't find current zoom level index"
	},
	setMaxZoomLevel: function(a) {
		if (a < 0 || a >= this.zoomLevels.length) {
			throw new Error("Invalid range for `setMinZoomLevel`")
		}
		this.maxZoomLevel = a
	},
	setMinZoomLevel: function(a) {
		if (a < 0 || a >= this.zoomLevels.length) {
			throw new Error("Invalid range for `setMinZoomLevel`")
		}
		this.minZoomLevel = a
	},
	getViewportCenterDateCached: function() {
		if (this.cachedCenterDate) {
			return this.cachedCenterDate
		}
		return this.cachedCenterDate = this.getViewportCenterDate()
	},
	clearCenterDateCache: function() {
		this.cachedCenterDate = null
	},
	zoomToLevel: function(b, r) {
		b = Ext.Number.constrain(b, this.minZoomLevel, this.maxZoomLevel);
		var q = this.calculateCurrentZoomLevel();
		var e = this.getMilliSecondsPerPixelForZoomLevel(q);
		var l = this.zoomLevels[b];
		var a = this.getMilliSecondsPerPixelForZoomLevel(l);
		if (e == a && !r) {
			return null
		}
		var t = this;
		var m = this.getSchedulingView();
		var g = m.getOuterEl();
		var s = m.getScrollEventSource();
		if (this.isFirstZoom) {
			this.isFirstZoom = false;
			s.on("scroll", this.clearCenterDateCache, this)
		}
		var i = this.orientation == "vertical";
		var f = r ? new Date((r.start.getTime() + r.end.getTime()) / 2) : this.getViewportCenterDateCached();
		var n = i ? g.getHeight() : g.getWidth();
		var o = Ext.clone(Sch.preset.Manager.getPreset(l.preset));
		r = r || this.calculateOptimalDateRange(f, n, l);
		var c = o.headerConfig;
		var h = c.bottom;
		var u = c.middle;
		o[i ? "rowHeight": "timeColumnWidth"] = l.width;
		if (h) {
			h.increment = l.increment
		} else {
			u.increment = l.increment
		}
		this.isZooming = true;
		this.viewPreset = l.preset;
		var p = h ? h.unit: u.unit;
		var d = this.timeAxis;
		d.reconfigure({
			preset: o,
			headerConfig: c,
			unit: p,
			increment: l.increment,
			resolutionUnit: Sch.util.Date.getUnitByName(l.resolutionUnit || p),
			resolutionIncrement: l.resolution,
			weekStartDay: this.weekStartDay,
			mainUnit: u.unit,
			shiftUnit: o.shiftUnit,
			shiftIncrement: o.shiftIncrement || 1,
			defaultSpan: o.defaultSpan || 1,
			start: r.start || this.getStart(),
			end: r.end || this.getEnd()
		});
		if (r) {
			f = new Date((d.getStart().getTime() + d.getEnd().getTime()) / 2)
		}
		s.on("scroll",
		function() {
			t.cachedCenterDate = f
		},
		this, {
			single: true
		});
		if (i) {
			var j = m.getYFromDate(f, true);
			m.scrollVerticallyTo(j - n / 2)
		} else {
			var k = m.getXFromDate(f, true);
			m.scrollHorizontallyTo(k - n / 2)
		}
		t.isZooming = false;
		this.fireEvent("zoomchange", this, b);
		return b
	},
	zoomToSpan: function(r, u) {
		if (r.start && r.end && r.start < r.end) {
			u = Ext.applyIf(u || {},
			{
				adjustStart: 1,
				adjustEnd: 1
			});
			var f = r.start,
			e = r.end,
			h = function(w) {
				return w
			},
			t = h,
			s = h;
			if (this.timeAxis.autoAdjust) {
				if (u.adjustStart) {
					t = function(A, y, z) {
						var w = Sch.util.Date.add(A, z && z.mainUnit || y, -u.adjustStart);
						if (z) {
							var x = z.getAdjustedDates(w, e);
							return x.start
						}
						return w
					}
				}
				if (u.adjustEnd) {
					s = function(x, z, A) {
						var w = Sch.util.Date.add(x, A && A.mainUnit || z, u.adjustEnd);
						if (A) {
							var y = A.getAdjustedDates(f, w);
							return y.end
						}
						return w
					}
				}
			} else {
				if (u.adjustStart) {
					t = function(x, w) {
						return Sch.util.Date.add(x, w, -u.adjustStart)
					}
				}
				if (u.adjustEnd) {
					s = function(w, x) {
						return Sch.util.Date.add(w, x, u.adjustEnd)
					}
				}
			}
			var d = Ext.create("Sch.data.TimeAxis");
			var q = this.getSchedulingView().getTimeAxisViewModel().getAvailableWidth();
			var l = Math.floor(this.getCurrentZoomLevelIndex());
			if (l == -1) {
				l = 0
			}
			var b = s(e, this.timeAxis.mainUnit, this.timeAxis) - t(f, this.timeAxis.mainUnit, this.timeAxis),
			n = this.getMilliSecondsPerPixelForZoomLevel(this.zoomLevels[l]),
			k = b / n > q ? -1: 1,
			a = l + k,
			j = this.orientation == "vertical" ? "rowHeight": "timeColumnWidth";
			var o,
			p,
			m,
			g = null,
			c = this.timeAxis.mainUnit;
			while (a >= 0 && a <= this.zoomLevels.length - 1) {
				o = this.zoomLevels[a];
				p = Ext.clone(Sch.preset.Manager.getPreset(o.preset));
				var i = p.headerConfig.bottom;
				var v = p.headerConfig.middle;
				p[j] = o.width;
				if (i) {
					i.increment = o.increment;
					m = i.unit
				} else {
					v.increment = o.increment;
					m = v.unit
				}
				Ext.apply(d, {
					autoAdjust: this.timeAxis.autoAdjust,
					preset: p,
					headerConfig: p.headerConfig,
					unit: m,
					increment: o.increment,
					resolutionUnit: Sch.util.Date.getUnitByName(o.resolutionUnit || m),
					resolutionIncrement: o.resolution,
					mainUnit: v.unit,
					shiftUnit: p.shiftUnit,
					shiftIncrement: p.shiftIncrement || 1,
					defaultSpan: p.defaultSpan || 1
				});
				b = s(e, m, d) - t(f, m, d);
				n = this.getMilliSecondsPerPixelForZoomLevel(o);
				if (k < 0) {
					if (b / n <= q) {
						g = a;
						c = m;
						break
					}
				} else {
					if (b / n <= q) {
						if (l !== a - k) {
							g = a - k;
							c = m
						}
					} else {
						break
					}
				}
				a += k
			}
			g = g !== null ? g: a - k;
			return this.zoomToLevel(g, {
				start: t(f, c),
				end: s(e, c)
			})
		}
		return null
	},
	zoomIn: function(a) {
		a = a || 1;
		var b = this.getCurrentZoomLevelIndex();
		if (b >= this.zoomLevels.length - 1) {
			return null
		}
		return this.zoomToLevel(Math.floor(b) + a)
	},
	zoomOut: function(a) {
		a = a || 1;
		var b = this.getCurrentZoomLevelIndex();
		if (b <= 0) {
			return null
		}
		return this.zoomToLevel(Math.ceil(b) - a)
	},
	zoomInFull: function() {
		return this.zoomToLevel(this.maxZoomLevel)
	},
	zoomOutFull: function() {
		return this.zoomToLevel(this.minZoomLevel)
	},
	calculateOptimalDateRange: function(c, h, e) {
		var b = Sch.util.Date;
		var i = Sch.preset.Manager.getPreset(e.preset).headerConfig;
		var f = i.top ? i.top.unit: i.middle.unit;
		var j = this.getZoomLevelUnit(e);
		var d = Math.ceil(h / e.width * e.increment * this.visibleZoomFactor / 2);
		var a = b.add(c, j, -d);
		var g = b.add(c, j, d);
		return {
			start: this.timeAxis.floorDate(a, false, f),
			end: this.timeAxis.ceilDate(g, false, f)
		}
	}
});
Ext.define("Sch.mixin.AbstractTimelinePanel", {
	requires: ["Sch.data.TimeAxis", "Sch.view.model.TimeAxis", "Sch.feature.ColumnLines", "Sch.preset.Manager"],
	mixins: ["Sch.mixin.Zoomable"],
	orientation: "horizontal",
	weekStartDay: 1,
	snapToIncrement: false,
	readOnly: false,
	eventResizeHandles: "both",
	timeAxis: null,
	timeAxisViewModel: null,
	viewPreset: "weekAndDay",
	trackHeaderOver: true,
	startDate: null,
	endDate: null,
	columnLines: true,
	trackMouseOver: false,
	eventBorderWidth: 1,
	getOrientation: function() {
		return this.orientation
	},
	cellBorderWidth: 1,
	cellTopBorderWidth: 1,
	cellBottomBorderWidth: 1,
	_initializeTimelinePanel: function() {
		this.initializeZooming();
		this.renderers = [];
		if (!this.timeAxis) {
			this.timeAxis = Ext.create("Sch.data.TimeAxis")
		}
		if (!this.timeAxisViewModel || !(this.timeAxisViewModel instanceof Sch.view.model.TimeAxis)) {
			var a = Ext.apply({
				snapToIncrement: this.snapToIncrement,
				forceFit: this.forceFit,
				timeAxis: this.timeAxis
			},
			this.timeAxisViewModel || {});
			this.timeAxisViewModel = new Sch.view.model.TimeAxis(a)
		}
		this.timeAxisViewModel.on("update", this.onTimeAxisViewModelUpdate, this);
		this.timeAxisViewModel.refCount++;
		if (!this.viewPreset) {
			throw "You must define a valid view preset object. See Sch.preset.Manager class for reference"
		}
		this.on("destroy", this.onPanelDestroyed, this);
		this.timeAxis.on("reconfigure", this.onTimeAxisReconfigure, this);
		this.addCls(["sch-timelinepanel", "sch-" + this.orientation])
	},
	onTimeAxisViewModelUpdate: function() {
		var a = this.getSchedulingView();
		if (a && a.viewReady) {
			a.refreshKeepingScroll()
		}
	},
	onPanelDestroyed: function() {
		this.timeAxisViewModel.un("update", this.onTimeAxisViewModelUpdate, this);
		this.timeAxisViewModel.refCount--;
		if (this.timeAxisViewModel.refCount <= 0) {
			this.timeAxisViewModel.destroy()
		}
		this.timeAxis.un("reconfigure", this.onTimeAxisReconfigure, this)
	},
	getSchedulingView: function() {
		throw "Abstract method call"
	},
	setReadOnly: function(a) {
		this.getSchedulingView().setReadOnly(a)
	},
	isReadOnly: function() {
		return this.getSchedulingView().isReadOnly()
	},
	switchViewPreset: function(d, a, f, b) {
		if (b && this.timeAxis.preset) {
			this.applyViewSettings(this.timeAxis.preset);
			return
		}
		if (this.fireEvent("beforeviewchange", this, d, a, f) !== false) {
			if (Ext.isString(d)) {
				this.viewPreset = d;
				d = Sch.preset.Manager.getPreset(d)
			}
			if (!d) {
				throw "View preset not found"
			}
			var e = d.headerConfig;
			var c = {
				unit: e.bottom ? e.bottom.unit: e.middle.unit,
				increment: (e.bottom ? e.bottom.increment: e.middle.increment) || 1,
				resolutionUnit: d.timeResolution.unit,
				resolutionIncrement: d.timeResolution.increment,
				weekStartDay: this.weekStartDay,
				mainUnit: e.middle.unit,
				shiftUnit: d.shiftUnit,
				headerConfig: d.headerConfig,
				shiftIncrement: d.shiftIncrement || 1,
				preset: d,
				defaultSpan: d.defaultSpan || 1
			};
			if (b) {
				if (this.timeAxis.getCount() === 0 || a) {
					c.start = a || new Date()
				}
			} else {
				c.start = a || this.timeAxis.getStart()
			}
			c.end = f;
			this.timeAxis.reconfigure(c);
			this.applyViewSettings(d);
			if (this.getOrientation() === "horizontal") {
				this.getSchedulingView().scrollHorizontallyTo(0)
			} else {
				this.getSchedulingView().scrollVerticallyTo(0)
			}
		}
	},
	applyViewSettings: function(b) {
		var a = this.getSchedulingView();
		a.setDisplayDateFormat(b.displayDateFormat);
		if (this.orientation === "horizontal") {
			a.setRowHeight(this.rowHeight || b.rowHeight, true)
		}
	},
	getStart: function() {
		return this.getStartDate()
	},
	getStartDate: function() {
		return this.timeAxis.getStart()
	},
	getEnd: function() {
		return this.getEndDate()
	},
	getEndDate: function() {
		return this.timeAxis.getEnd()
	},
	setTimeColumnWidth: function(b, a) {
		this.timeAxisViewModel.setTickWidth(b, a)
	},
	getTimeColumnWidth: function() {
		return this.timeAxisViewModel.getTickWidth()
	},
	onTimeAxisReconfigure: function() {
		this.fireEvent("viewchange", this)
	},
	shiftNext: function(a) {
		this.suspendLayouts && this.suspendLayouts();
		this.timeAxis.shiftNext(a);
		this.suspendLayouts && this.resumeLayouts(true)
	},
	shiftPrevious: function(a) {
		this.suspendLayouts && this.suspendLayouts();
		this.timeAxis.shiftPrevious(a);
		this.suspendLayouts && this.resumeLayouts(true)
	},
	goToNow: function() {
		this.setTimeSpan(new Date())
	},
	setTimeSpan: function(b, a) {
		if (this.timeAxis) {
			this.timeAxis.setTimeSpan(b, a)
		}
	},
	setStart: function(a) {
		this.setTimeSpan(a)
	},
	setEnd: function(a) {
		this.setTimeSpan(null, a)
	},
	getTimeAxis: function() {
		return this.timeAxis
	},
	scrollToDate: function(d, c) {
		var b = this.getSchedulingView();
		var f = b.getCoordinateFromDate(d, true);
		if (f < 0) {
			var a = (this.timeAxis.getEnd() - this.timeAxis.getStart()) / 2;
			var e = this;
			this.setTimeSpan(new Date(d.getTime() - a), new Date(d.getTime() + a));
			setTimeout(function() {
				e.scrollToDate(d, c)
			},
			20);
			return
		}
		if (this.orientation === "horizontal") {
			b.scrollHorizontallyTo(f, c)
		} else {
			b.scrollVerticallyTo(f, c)
		}
	},
	getViewportCenterDate: function() {
		var b = this.getSchedulingView(),
		a = b.getScroll(),
		c;
		if (this.getOrientation() === "vertical") {
			c = [0, a.top + b.getViewportHeight() / 2]
		} else {
			c = [a.left + b.getViewportWidth() / 2, 0]
		}
		return b.getDateFromXY(c, null, true)
	},
	addCls: function() {
		throw "Abstract method call"
	},
	removeCls: function() {
		throw "Abstract method call"
	},
	registerRenderer: function(b, a) {
		this.renderers.push({
			fn: b,
			scope: a
		})
	},
	deregisterRenderer: function(b, a) {
		Ext.each(this.renderers,
		function(c, d) {
			if (b === c) {
				Ext.Array.removeAt(this.renderers, d);
				return false
			}
		})
	}
});
Ext.define("Sch.mixin.TimelinePanel", {
	extend: "Sch.mixin.AbstractTimelinePanel",
	requires: ["Sch.util.Patch", "Sch.column.timeAxis.Horizontal", "Sch.preset.Manager"],
	mixins: ["Sch.mixin.Zoomable", "Sch.mixin.Lockable"],
	tipCfg: {
		cls: "sch-tip",
		showDelay: 1000,
		hideDelay: 0,
		autoHide: true,
		anchor: "b"
	},
	inheritables: function() {
		return {
			columnLines: true,
			enableLocking: true,
			lockable: true,
			initComponent: function() {
				if (this.partnerTimelinePanel) {
					this.timeAxisViewModel = this.partnerTimelinePanel.timeAxisViewModel;
					this.timeAxis = this.partnerTimelinePanel.getTimeAxis();
					this.startDate = this.timeAxis.getStart();
					this.endDate = this.timeAxis.getEnd()
				}
				if (this.viewConfig && this.viewConfig.forceFit) {
					this.forceFit = true
				}
				if (Ext.versions.extjs.isGreaterThanOrEqual("4.2.1")) {
					this.cellTopBorderWidth = 0
				}
				this._initializeTimelinePanel();
				this.configureColumns();
				var b = this.normalViewConfig = this.normalViewConfig || {};
				Ext.apply(this.normalViewConfig, {
					timeAxisViewModel: this.timeAxisViewModel,
					eventBorderWidth: this.eventBorderWidth,
					timeAxis: this.timeAxis,
					readOnly: this.readOnly,
					orientation: this.orientation,
					rtl: this.rtl,
					cellBorderWidth: this.cellBorderWidth,
					cellTopBorderWidth: this.cellTopBorderWidth,
					cellBottomBorderWidth: this.cellBottomBorderWidth
				});
				Ext.Array.forEach(["eventRendererScope", "eventRenderer", "dndValidatorFn", "resizeValidatorFn", "createValidatorFn", "tooltipTpl", "validatorFnScope", "snapToIncrement", "eventResizeHandles", "enableEventDragDrop", "enableDragCreation", "resizeConfig", "createConfig", "tipCfg", "getDateConstraints"],
				function(c) {
					if (c in this) {
						b[c] = this[c]
					}
				},
				this);
				this.mon(this.timeAxis, "reconfigure", this.onMyTimeAxisReconfigure, this);
				this.addEvents("timeheaderclick", "timeheaderdblclick", "beforeviewchange", "viewchange");
				this.callParent(arguments);
				this.switchViewPreset(this.viewPreset, this.startDate || this.timeAxis.getStart(), this.endDate || this.timeAxis.getEnd(), true);
				var a = this.columnLines;
				if (a) {
					this.columnLinesFeature = new Sch.feature.ColumnLines(Ext.isObject(a) ? a: undefined);
					this.columnLinesFeature.init(this);
					this.columnLines = true
				}
				this.relayEvents(this.getSchedulingView(), ["beforetooltipshow"]);
				this.on("afterrender", this.__onAfterRender, this);
				this.on("zoomchange",
				function() {
					this.normalGrid.scrollTask.cancel()
				})
			},
			getState: function() {
				var a = this,
				b = a.callParent(arguments);
				Ext.apply(b, {
					viewPreset: a.viewPreset,
					startDate: a.getStart(),
					endDate: a.getEnd(),
					zoomMinLevel: a.zoomMinLevel,
					zoomMaxLevel: a.zoomMaxLevel,
					currentZoomLevel: a.currentZoomLevel
				});
				return b
			},
			applyState: function(b) {
				var a = this;
				a.callParent(arguments);
				if (b && b.viewPreset) {
					a.switchViewPreset(b.viewPreset, b.startDate, b.endDate)
				}
				if (b && b.currentZoomLevel) {
					a.zoomToLevel(b.currentZoomLevel)
				}
			}
		}
	},
	onMyTimeAxisReconfigure: function(a) {
		if (this.stateful && this.rendered) {
			this.saveState()
		}
	},
	onLockedGridItemDblClick: function(b, a, c, e, d) {
		if (this.orientation === "vertical" && a) {
			this.fireEvent("timeheaderdblclick", this, a.get("start"), a.get("end"), e, d)
		}
	},
	getSchedulingView: function() {
		return this.normalGrid.getView()
	},
	getTimeAxisColumn: function() {
		if (!this.timeAxisColumn) {
			this.timeAxisColumn = this.down("timeaxiscolumn")
		}
		return this.timeAxisColumn
	},
	configureColumns: function() {
		var a = this.columns = this.columns || [];
		var c = [];
		var b = [];
		Ext.Array.each(a,
		function(d) {
			if (d.position === "right") {
				if (!Ext.isNumber(d.width)) {
					Ext.Error.raise('"Right" columns must have a fixed width')
				}
				d.locked = false;
				b.push(d)
			} else {
				d.locked = true;
				c.push(d)
			}
			d.lockable = false
		});
		Ext.Array.erase(a, 0, a.length);
		Ext.Array.insert(a, 0, c.concat({
			xtype: "timeaxiscolumn",
			timeAxisViewModel: this.timeAxisViewModel,
			trackHeaderOver: this.trackHeaderOver,
			renderer: this.mainRenderer,
			scope: this
		}).concat(b));
		this.horizontalColumns = Ext.Array.clone(a);
		this.verticalColumns = [Ext.apply({
			xtype: "verticaltimeaxis",
			width: 100,
			locked: true,
			timeAxis: this.timeAxis,
			timeAxisViewModel: this.timeAxisViewModel,
			cellTopBorderWidth: this.cellTopBorderWidth,
			cellBottomBorderWidth: this.cellBottomBorderWidth
		},
		this.timeAxisColumnCfg || {})];
		if (this.orientation === "vertical") {
			this.columns = this.verticalColumns;
			this.store = this.timeAxis;
			this.on("beforerender",
			function() {
				this.normalGrid.headerCt.add(this.createResourceColumns())
			},
			this)
		}
	},
	mainRenderer: function(b, m, f, j, l) {
		var g = this.renderers,
		k = this.orientation === "horizontal",
		c = k ? f: this.resourceStore.getAt(l),
		a = "&nbsp;";
		m.rowHeight = null;
		for (var d = 0; d < g.length; d++) {
			a += g[d].fn.call(g[d].scope || this, b, m, c, j, l) || ""
		}
		if (this.variableRowHeight) {
			var h = this.getSchedulingView();
			var e = k ? h.getRowHeight() : this.timeAxisViewModel.getTickWidth();
			m.style = "height:" + ((m.rowHeight || e) - h.cellTopBorderWidth - h.cellBottomBorderWidth) + "px"
		}
		return a
	},
	__onAfterRender: function() {
		var a = this;
		a.normalGrid.on({
			collapse: a.onNormalGridCollapse,
			expand: a.onNormalGridExpand,
			scope: a
		});
		a.lockedGrid.on({
			collapse: a.onLockedGridCollapse,
			itemdblclick: a.onLockedGridItemDblClick,
			scope: a
		});
		if (a.lockedGridDependsOnSchedule) {
			a.normalGrid.getView().on("itemupdate", a.onNormalViewItemUpdate, a)
		}
		if (this.partnerTimelinePanel) {
			if (this.partnerTimelinePanel.rendered) {
				this.setupPartnerTimelinePanel()
			} else {
				this.partnerTimelinePanel.on("afterrender", this.setupPartnerTimelinePanel, this)
			}
		}
	},
	onLockedGridCollapse: function() {
		if (this.normalGrid.collapsed) {
			this.normalGrid.expand()
		}
	},
	onNormalGridCollapse: function() {
		var a = this;
		if (!a.normalGrid.reExpander) {
			a.normalGrid.reExpander = a.normalGrid.placeholder
		}
		if (!a.lockedGrid.rendered) {
			a.lockedGrid.on("render", a.onNormalGridCollapse, a, {
				delay: 1
			})
		} else {
			a.lockedGrid.flex = 1;
			a.lockedGrid.doLayout();
			if (a.lockedGrid.collapsed) {
				a.lockedGrid.expand()
			}
			a.addCls("sch-normalgrid-collapsed")
		}
	},
	onNormalGridExpand: function() {
		this.removeCls("sch-normalgrid-collapsed");
		delete this.lockedGrid.flex;
		this.lockedGrid.doLayout()
	},
	onNormalViewItemUpdate: function(a, b, d) {
		if (this.lockedGridDependsOnSchedule) {
			var c = this.lockedGrid.getView();
			c.suspendEvents();
			c.refreshNode(b);
			c.resumeEvents()
		}
	},
	setupPartnerTimelinePanel: function() {
		var f = this.partnerTimelinePanel;
		var d = f.down("splitter");
		var c = this.down("splitter");
		if (d) {
			d.on("dragend",
			function() {
				this.lockedGrid.setWidth(f.lockedGrid.getWidth())
			},
			this)
		}
		if (c) {
			c.on("dragend",
			function() {
				f.lockedGrid.setWidth(this.lockedGrid.getWidth())
			},
			this)
		}
		var b = this.partnerTimelinePanel.lockedGrid.getWidth();
		this.lockedGrid.setWidth(b);
		var a = this.partnerTimelinePanel.getSchedulingView().getEl(),
		e = this.getSchedulingView().getEl();
		this.partnerTimelinePanel.mon(e, "scroll",
		function(h, g) {
			a.scrollTo("left", g.scrollLeft)
		});
		this.mon(a, "scroll",
		function(h, g) {
			e.scrollTo("left", g.scrollLeft)
		})
	}
},
function() {
	var a = "4.2.0";
	Ext.apply(Sch, {
		VERSION: "2.2.9"
	});
	if (Ext.versions.extjs.isLessThan(a)) {
		alert("The Ext JS version you are using needs to be updated to at least " + a)
	}
});
Ext.define("Sch.mixin.AbstractSchedulerPanel", {
	requires: ["Sch.model.Event", "Sch.model.Resource", "Sch.data.EventStore", "Sch.data.ResourceStore", "Sch.util.Date"],
	eventBarIconClsField: "",
	enableEventDragDrop: true,
	allowOverlap: true,
	startParamName: "startDate",
	endParamName: "endDate",
	passStartEndParameters: false,
	eventRenderer: null,
	eventRendererScope: null,
	eventStore: null,
	resourceStore: null,
	onEventCreated: function(a) {},
	initStores: function() {
		var a = this.resourceStore || this.store;
		if (!a) {
			Ext.Error.raise("You must specify a resourceStore config")
		}
		if (!this.eventStore) {
			Ext.Error.raise("You must specify an eventStore config")
		}
		this.store = Ext.StoreManager.lookup(a);
		this.resourceStore = Ext.StoreManager.lookup(this.store);
		this.eventStore = Ext.StoreManager.lookup(this.eventStore);
		if (!this.eventStore.isEventStore) {
			Ext.Error.raise("Your eventStore should be a subclass of Sch.data.EventStore (or consume the EventStore mixin)")
		}
		this.resourceStore.eventStore = this.eventStore;
		if (this.passStartEndParameters) {
			this.eventStore.on("beforeload", this.applyStartEndParameters, this)
		}
	},
	_initializeSchedulerPanel: function() {
		this.initStores();
		if (this.eventBodyTemplate && Ext.isString(this.eventBodyTemplate)) {
			this.eventBodyTemplate = new Ext.XTemplate(this.eventBodyTemplate)
		}
	},
	getResourceStore: function() {
		return this.resourceStore
	},
	getEventStore: function() {
		return this.eventStore
	},
	applyStartEndParameters: function(b, a) {
		a.params = a.params || {};
		a.params[this.startParamName] = this.getStart();
		a.params[this.endParamName] = this.getEnd()
	}
});
Ext.define("Sch.mixin.SchedulerPanel", {
	extend: "Sch.mixin.AbstractSchedulerPanel",
	requires: ["Sch.view.SchedulerGridView", "Sch.selection.EventModel", "Sch.plugin.ResourceZones", "Sch.column.timeAxis.Vertical"],
	resourceColumnWidth: null,
	eventSelModelType: "eventmodel",
	eventSelModel: null,
	enableEventDragDrop: true,
	enableDragCreation: true,
	dragConfig: null,
	dropConfig: null,
	resourceZones: null,
	componentCls: "sch-schedulerpanel",
	lockedGridDependsOnSchedule: true,
	resourceColumnClass: "Sch.column.Resource",
	variableRowHeight: true,
	inheritables: function() {
		return {
			initComponent: function() {
				var c = this.normalViewConfig = this.normalViewConfig || {};
				this._initializeSchedulerPanel();
				Ext.apply(c, {
					eventStore: this.eventStore,
					resourceStore: this.resourceStore,
					eventBarTextField: this.eventBarTextField || this.eventStore.model.prototype.nameField
				});
				Ext.Array.forEach(["barMargin", "eventBodyTemplate", "eventTpl", "allowOverlap", "dragConfig", "dropConfig", "eventBarIconClsField", "onEventCreated", "constrainDragToResource"],
				function(d) {
					if (d in this) {
						c[d] = this[d]
					}
				},
				this);
				if (this.orientation === "vertical") {
					this.mon(this.resourceStore, {
						clear: this.refreshResourceColumns,
						datachanged: this.refreshResourceColumns,
						update: this.refreshResourceColumns,
						load: this.refreshResourceColumns,
						scope: this
					})
				}
				this.callParent(arguments);
				var a = this.getSchedulingView();
				this.registerRenderer(a.columnRenderer, a);
				if (this.resourceZones) {
					var b = Ext.StoreManager.lookup(this.resourceZones);
					b.setResourceStore(this.resourceStore);
					this.resourceZonesPlug = Ext.create("Sch.plugin.ResourceZones", {
						store: b
					});
					this.resourceZonesPlug.init(this)
				}
				this.relayEvents(this.getSchedulingView(), ["eventclick", "eventmousedown", "eventmouseup", "eventdblclick", "eventcontextmenu", "eventmouseenter", "eventmouseleave", "beforeeventresize", "eventresizestart", "eventpartialresize", "beforeeventresizefinalize", "eventresizeend", "beforeeventdrag", "eventdragstart", "eventdrag", "beforeeventdropfinalize", "eventdrop", "aftereventdrop", "beforedragcreate", "dragcreatestart", "beforedragcreatefinalize", "dragcreateend", "afterdragcreate", "beforeeventadd", "scheduleclick", "scheduledblclick", "schedulecontextmenu"]);
				this.addEvents("orientationchange");
				if (!this.syncRowHeight) {
					this.enableRowHeightInjection(this.lockedGrid.getView(), this.normalGrid.getView())
				}
			},
			applyViewSettings: function(c) {
				this.callParent(arguments);
				var b = this.getSchedulingView(),
				a;
				if (this.orientation === "horizontal") {
					a = this.rowHeight = this.rowHeight || c.rowHeight
				} else {
					a = this.timeColumnWidth = this.timeColumnWidth || c.timeColumnWidth || 60;
					b.setColumnWidth(c.resourceColumnWidth || 100, true)
				}
				b.setRowHeight(a, true)
			}
		}
	},
	enableRowHeightInjection: function(a, c) {
		var b = new Ext.XTemplate("{%", "this.processCellValues(values);", "this.nextTpl.applyOut(values, out, parent);", "%}", {
			priority: 1,
			processCellValues: function(e) {
				if (c.orientation === "horizontal") {
					var f = c.eventLayout.horizontal;
					var g = e.record;
					var d = f.getRowHeight(g) - c.cellTopBorderWidth - c.cellBottomBorderWidth;
					e.style = (e.style || "") + ";height:" + d + "px;"
				}
			}
		});
		a.addCellTpl(b)
	},
	getEventSelectionModel: function() {
		if (this.eventSelModel && this.eventSelModel.events) {
			return this.eventSelModel
		}
		if (!this.eventSelModel) {
			this.eventSelModel = {}
		}
		var a = this.eventSelModel;
		var b = "SINGLE";
		if (this.simpleSelect) {
			b = "SIMPLE"
		} else {
			if (this.multiSelect) {
				b = "MULTI"
			}
		}
		Ext.applyIf(a, {
			allowDeselect: this.allowDeselect,
			mode: b
		});
		if (!a.events) {
			a = this.eventSelModel = Ext.create("selection." + this.eventSelModelType, a)
		}
		if (!a.hasRelaySetup) {
			this.relayEvents(a, ["selectionchange", "deselect", "select"]);
			a.hasRelaySetup = true
		}
		if (this.disableSelection) {
			a.locked = true
		}
		return a
	},
	refreshResourceColumns: function() {
		var a = this.normalGrid.headerCt;
		a.removeAll();
		a.add(this.createResourceColumns());
		this.getView().refresh()
	},
	createResourceColumns: function() {
		var a = [];
		var b = this;
		this.resourceStore.each(function(c) {
			a.push(Ext.create(this.resourceColumnClass, {
				tdCls: "sch-timetd",
				renderer: b.mainRenderer,
				scope: b,
				width: b.resourceColumnWidth || b.timeAxis.preset.resourceColumnWidth || 100,
				text: c.getName(),
				model: c
			}))
		},
		this);
		return a
	},
	setOrientation: function(a, d) {
		if (a === this.orientation && !d) {
			return
		}
		this.removeCls("sch-" + this.orientation);
		this.addCls("sch-" + a);
		this.orientation = a;
		var c = this,
		e = c.normalGrid,
		f = c.getSchedulingView(),
		b = e.headerCt;
		f.setOrientation(a);
		Ext.suspendLayouts();
		b.removeAll(true);
		Ext.resumeLayouts();
		if (a === "horizontal") {
			c.mun(c.resourceStore, {
				clear: c.refreshResourceColumns,
				datachanged: c.refreshResourceColumns,
				load: c.refreshResourceColumns,
				scope: c
			});
			f.setRowHeight(c.rowHeight || c.timeAxis.preset.rowHeight, true);
			c.reconfigure(c.resourceStore, c.horizontalColumns)
		} else {
			c.mon(c.resourceStore, {
				clear: c.refreshResourceColumns,
				datachanged: c.refreshResourceColumns,
				load: c.refreshResourceColumns,
				scope: c
			});
			c.reconfigure(c.timeAxis, c.verticalColumns.concat(c.createResourceColumns()));
			f.setColumnWidth(c.timeAxis.preset.resourceColumnWidth || 100, true)
		}
		this.fireEvent("orientationchange", this, a)
	}
});
Ext.define("Sch.mixin.FilterableTreeView", {
	prevBlockRefresh: null,
	initTreeFiltering: function() {
		var a = function() {
			var b = this.up("tablepanel").store;
			if (b instanceof Ext.data.NodeStore) {
				b = this.up("tablepanel[lockable=true]").store
			}
			this.mon(b, "nodestore-datachange-start", this.onFilterChangeStart, this);
			this.mon(b, "nodestore-datachange-end", this.onFilterChangeEnd, this);
			this.mon(b, "filter-clear", this.onFilterCleared, this);
			this.mon(b, "filter-set", this.onFilterSet, this)
		};
		if (this.rendered) {
			a.call(this)
		} else {
			this.on("beforerender", a, this, {
				single: true
			})
		}
	},
	onFilterChangeStart: function() {
		this.prevBlockRefresh = this.blockRefresh;
		this.blockRefresh = true;
		Ext.suspendLayouts()
	},
	onFilterChangeEnd: function() {
		Ext.resumeLayouts(true);
		this.blockRefresh = this.prevBlockRefresh
	},
	onFilterCleared: function() {
		delete this.toggle;
		var a = this.getEl();
		if (a) {
			a.removeCls("sch-tree-filtered")
		}
	},
	onFilterSet: function() {
		this.toggle = function() {};
		var a = this.getEl();
		if (a) {
			a.addCls("sch-tree-filtered")
		}
	}
});
Ext.define("Sch.panel.TimelineGridPanel", {
	extend: "Ext.grid.Panel",
	mixins: ["Sch.mixin.TimelinePanel"],
	subGridXType: "gridpanel",
	initComponent: function() {
		this.callParent(arguments);
		this.getSchedulingView()._initializeTimelineView()
	}
},
function() {
	this.override(Sch.mixin.TimelinePanel.prototype.inheritables() || {})
});
Ext.define("Sch.panel.TimelineTreePanel", {
	extend: "Ext.tree.Panel",
	requires: ["Ext.data.TreeStore", "Sch.mixin.FilterableTreeView"],
	mixins: ["Sch.mixin.TimelinePanel"],
	useArrows: true,
	rootVisible: false,
	lockedXType: "treepanel",
	initComponent: function() {
		this.callParent(arguments);
		this.getSchedulingView()._initializeTimelineView()
	}
},
function() {
	this.override(Sch.mixin.TimelinePanel.prototype.inheritables() || {})
});
Ext.define("Sch.panel.SchedulerGrid", {
	extend: "Sch.panel.TimelineGridPanel",
	mixins: ["Sch.mixin.SchedulerPanel"],
	alias: ["widget.schedulergrid", "widget.schedulerpanel"],
	alternateClassName: "Sch.SchedulerPanel",
	viewType: "schedulergridview",
	initComponent: function() {
		this.callParent(arguments);
		this.getSchedulingView()._initializeSchedulerView()
	}
},
function() {
	this.override(Sch.mixin.SchedulerPanel.prototype.inheritables() || {})
});
Ext.define("Sch.panel.SchedulerTree", {
	extend: "Sch.panel.TimelineTreePanel",
	mixins: ["Sch.mixin.SchedulerPanel"],
	alias: ["widget.schedulertree"],
	viewType: "schedulergridview",
	setOrientation: function(a) {
		if (a == "vertical") {
			Ext.Error.raise("Sch.panel.SchedulerTree does not support vertical orientation")
		}
	},
	initComponent: function() {
		this.callParent(arguments);
		this.getSchedulingView()._initializeSchedulerView()
	}
},
function() {
	this.override(Sch.mixin.SchedulerPanel.prototype.inheritables() || {})
});
Ext.data.Connection.override({
	parseStatus: function(b) {
		var a = this.callOverridden(arguments);
		if (b === 0) {
			a.success = true
		}
		return a
	}
});